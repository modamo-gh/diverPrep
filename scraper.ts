import * as cheerio from "cheerio";
import * as dotenv from "dotenv";
import { Client } from "pg";
import puppeteer, { Browser } from "puppeteer";

dotenv.config();

const BASE_URL = "https://helldivers.wiki.gg";
const ENEMY_LIST_URL = `${BASE_URL}/wiki/Enemies`;
const WEAPONS_LIST_URL = `${BASE_URL}/wiki/Weapons`;

const client = new Client({
	host: process.env.PGHOST,
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	database: process.env.PGDATABASE,
	port: Number(process.env.PGPORT)
});

const fetchPage = async (url: string, browser: Browser) => {
	try {
		const page = await browser.newPage();

		await page.setUserAgent(
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
				"(KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
		);
		await page.goto(url, { waitUntil: "domcontentloaded" });

		const content = await page.content();

		await page.close();

		return cheerio.load(content);
	} catch (error) {
		console.error(`Puppeteer error fetching ${url}:`, error);

		return null;
	}
};

const getEnemyLinks = async (browser: Browser) => {
	const $ = await fetchPage(ENEMY_LIST_URL, browser);

	if (!$) {
		return [];
	}

	const enemyLinks: string[] = [];
	const elements = $("table.wikitable a").toArray();

	for (const element of elements) {
		const href = $(element).attr("href");

		if (href && !href.startsWith("/wiki/File:")) {
			const enemyName = $(element).text().trim();
			const link = BASE_URL + href;

			if (enemyName !== "Hulk" && enemyName !== "Tank") {
				enemyLinks.push(link);
			} else {
				const $$ = await fetchPage(link, browser);

				if (!$$) {
					continue;
				}

				const variantLinks = $$("p:contains('variant')")
					.nextAll("ul")
					.first()
					.find("a")
					.map((_, el) => BASE_URL + $$(el).attr("href"))
					.get();

				enemyLinks.push(...variantLinks);
			}
		}
	}

	return enemyLinks;
};

const getWeaponLinks = async (browser: Browser) => {
	const $ = await fetchPage(WEAPONS_LIST_URL, browser);

	if (!$) {
		return [];
	}

	const weaponLinks: string[] = [];

	$("div.gallerytext p a").each((_, element) => {
		const href = $(element).attr("href");

		if (href && !href.startsWith("/wiki/Damage")) {
			weaponLinks.push(BASE_URL + href);
		}
	});

	return weaponLinks;
};

const run = async () => {
	const browser = await puppeteer.launch({ headless: true });

	await client.connect();
	await scrapeAndStoreEnemies(browser);
	await scrapeAndStoreWeapons(browser);
	await client.end();
	await browser.close();

	console.log("All scraping complete!");
};

const scrapeAndStoreEnemies = async (browser: Browser) => {
	const enemyLinks = await getEnemyLinks(browser);

	for (const enemyLink of enemyLinks) {
		const $ = await fetchPage(enemyLink, browser);

		if (!$) {
			continue;
		}

		const faction = $("aside h3:contains('Faction') + div span a")
			.text()
			.trim();
		const imageURL = $("aside figure a img").attr("src");
		const name = $("h1 span").text().trim();

		const armorValues = $("table.wikitable")
			.first()
			.find("tr td:nth-child(3) span a img")
			.map((_, element) => $(element).attr("alt")?.match(/\d+/)?.[0])
			.get()
			.map(Number);

		const armorValueFrequencyTable = new Map<number, number>();

		for (const value of armorValues) {
			armorValueFrequencyTable.set(
				value,
				(armorValueFrequencyTable.get(value) || 0) + 1
			);
		}

		const calculateMode = (frequencyTable: Map<number, number>) => {
			let highestFrequency = 0;
			let hightestFrequencyValue = -1;

			for (const [value, frequency] of frequencyTable) {
				if (
					frequency > highestFrequency ||
					(frequency === highestFrequency &&
						value > hightestFrequencyValue)
				) {
					highestFrequency = frequency;
					hightestFrequencyValue = value;
				}
			}

			return hightestFrequencyValue;
		};

		const calculateWeightedAverage = (
			frequencyTable: Map<number, number>
		) => {
			let weightedAverage = 0;

			for (const [value, frequency] of frequencyTable) {
				weightedAverage += value * (frequency / armorValues.length);
			}

			return Math.round(weightedAverage);
		};

		const max = Math.max(...armorValues);
		const mode = calculateMode(armorValueFrequencyTable);
		const weightedAverage = calculateWeightedAverage(
			armorValueFrequencyTable
		);

		if (
			faction &&
			imageURL &&
			max !== undefined &&
			mode !== undefined &&
			name &&
			weightedAverage !== undefined
		) {
			await storeEnemyData(
				faction,
				BASE_URL + imageURL,
				max,
				mode,
				name,
				weightedAverage
			);
		}
	}

	console.log("Enemy Scraping complete!");
};

const scrapeAndStoreWeapons = async (browser: Browser) => {
	const weaponLinks = await getWeaponLinks(browser);

	console.log(`Found ${weaponLinks.length} weapon links`);
	console.log("Sample links:", weaponLinks.slice(0, 3));

	for (const weaponLink of weaponLinks) {
		console.log("Fetching weapon:", weaponLink);
		const $ = await fetchPage(weaponLink, browser);

		if (!$) {
			console.warn("Failed to load weapon page");
			continue;
		}

		const category =
			$("aside section h3:contains('Weapon Category') + div")
				.text()
				.trim() || "Throwables";
		const imageURL = $("aside figure a img").last().attr("src");
		const name = $("h1 span").text().trim();
		const penetration = Number(
			$("aside section h3:contains('Penetration') + div span a img")
				.attr("alt")
				?.match(/\d+/)?.[0] ||
				$("aside section h3:contains('Penetration') + div")
					.text()
					.trim()
		);

		console.log({ name, category, imageURL, penetration });

		if (category && imageURL && name && penetration !== undefined) {
			await storeWeaponData(
				category,
				BASE_URL + imageURL,
				name,
				penetration
			);
		}
	}

	console.log("Weapon Scraping complete!");
};

const storeEnemyData = async (
	faction: string,
	imageURL: string,
	max: number,
	mode: number,
	name: string,
	weightedAverage: number
) => {
	try {
		await client.query(
			"INSERT INTO enemies (name, faction, image_url, max, mode, weightedAverage) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (name) DO NOTHING;",
			[name, faction, imageURL, max, mode, weightedAverage]
		);

		console.log(`Stored: ${name}`);
	} catch (error) {
		console.error("Error storing enemy data:", error);
	}
};

const storeWeaponData = async (
	category: string,
	imageURL: string,
	name: string,
	penetration: number
) => {
	try {
		await client.query(
			"INSERT INTO weapons (name, category, image_url, penetration) VALUES ($1, $2, $3, $4) ON CONFLICT (name) DO NOTHING;",
			[name, category, imageURL, penetration]
		);

		console.log(`Stored: ${name}`);
	} catch (error) {
		console.error("Error storing weapon data:", error);
	}
};

run();
