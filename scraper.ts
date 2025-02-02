import axios from "axios";
import * as cheerio from "cheerio";
import * as dotenv from "dotenv";
import { Client } from "pg";

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

const headers = {
	"User-Agent": "Mozilla/5.0"
};

const fetchPage = async (url: string) => {
	try {
		const { data } = await axios.get(url, { headers });

		return cheerio.load(data);
	} catch (error) {
		console.error(`Error fetching ${url}:`, error);

		return null;
	}
};

const getEnemyLinks = async () => {
	const $ = await fetchPage(ENEMY_LIST_URL);

	if (!$) {
		return [];
	}

	const enemyLinks: string[] = [];

	$("table.wikitable a").each((_, element) => {
		const href = $(element).attr("href");

		if (href && !href.startsWith("/wiki/File:")) {
			enemyLinks.push(BASE_URL + href);
		}
	});

	return enemyLinks;
};

const getWeaponLinks = async () => {
	const $ = await fetchPage(WEAPONS_LIST_URL);

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

const scrapeAndStoreEnemies = async () => {
	await client.connect();

	const enemyLinks = await getEnemyLinks();

	for (const enemyLink of enemyLinks) {
		const $ = await fetchPage(enemyLink);

		if (!$) {
			continue;
		}

		const faction = $("aside h3:contains('Faction') + div span a")
			.text()
			.trim();
		const imageURL = $("aside figure a img").attr("src");
		const name = $("h1 span").text().trim();

		if (faction && imageURL && name) {
			await storeEnemyData(faction, BASE_URL + imageURL, name);
		}
	}

	await client.end();

	console.log("Scraping complete!");
};

const scrapeAndStoreWeapons = async () => {
	await client.connect();

	const weaponLinks = await getWeaponLinks();

	for (const weaponLink of weaponLinks) {
		const $ = await fetchPage(weaponLink);

		if (!$) {
			continue;
		}
		const imageURL = $("aside figure a img").last().attr("src");
		const name = $("h1 span").text().trim();

		if (imageURL && name) {
			await storeWeaponData(BASE_URL + imageURL, name);
		}
	}

	await client.end();

	console.log("Scraping complete!");
};

const storeEnemyData = async (
	faction: string,
	imageURL: string,
	name: string
) => {
	try {
		await client.query(
			"INSERT INTO enemies (name, faction, image_url) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING;",
			[name, faction, imageURL]
		);

		console.log(`Stored: ${name}`);
	} catch (error) {
		console.error("Error storing enemy data:", error);
	}
};

const storeWeaponData = async (
	imageURL: string,
	name: string
) => {
	try {
		await client.query(
			"INSERT INTO weapons (name, image_url) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING;",
			[name, imageURL]
		);

		console.log(`Stored: ${name}`);
	} catch (error) {
		console.error("Error storing weapon data:", error);
	}
};

scrapeAndStoreWeapons();