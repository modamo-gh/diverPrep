import axios from "axios";
import * as cheerio from "cheerio";

const BASE_URL = "https://helldivers.wiki.gg";
const ENEMY_LIST_URL = `${BASE_URL}/wiki/Enemies`;

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

const getEnemyImages = async () => {
	const enemyLinks = await getEnemyLinks();
	const enemyImages: string[] = [];

	for (const enemyLink of enemyLinks) {
		const $ = await fetchPage(enemyLink);

		if (!$) {
			continue;
		}

		const href = $("aside figure a").attr("href");

		if (href && href.startsWith("/wiki/File:")) {
			enemyImages.push(BASE_URL + href);
		}
	}

	return enemyImages;
};

(async () => {
	const images = await getEnemyImages();
	console.log(images);
})();
