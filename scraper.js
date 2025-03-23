"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio = require("cheerio");
var dotenv = require("dotenv");
var pg_1 = require("pg");
var puppeteer_1 = require("puppeteer");
dotenv.config();
var BASE_URL = "https://helldivers.wiki.gg";
var ENEMY_LIST_URL = "".concat(BASE_URL, "/wiki/Enemies");
var WEAPONS_LIST_URL = "".concat(BASE_URL, "/wiki/Weapons");
var client = new pg_1.Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT)
});
var headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive"
};
var fetchPage = function (url, page) { return __awaiter(void 0, void 0, void 0, function () {
    var content, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
                        "(KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36")];
            case 1:
                _a.sent();
                return [4 /*yield*/, page.goto(url, { waitUntil: "networkidle2" })];
            case 2:
                _a.sent();
                return [4 /*yield*/, page.content()];
            case 3:
                content = _a.sent();
                return [2 /*return*/, cheerio.load(content)];
            case 4:
                error_1 = _a.sent();
                console.error("Puppeteer error fetching ".concat(url, ":"), error_1);
                return [2 /*return*/, null];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getEnemyLinks = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var $, enemyLinks, elements, _loop_1, _i, elements_1, element;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchPage(ENEMY_LIST_URL, page)];
            case 1:
                $ = _a.sent();
                if (!$) {
                    return [2 /*return*/, []];
                }
                enemyLinks = [];
                elements = $("table.wikitable a").toArray();
                _loop_1 = function (element) {
                    var href, enemyName, link, $$_1, variantLinks;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                href = $(element).attr("href");
                                if (!(href && !href.startsWith("/wiki/File:"))) return [3 /*break*/, 3];
                                enemyName = $(element).text().trim();
                                link = BASE_URL + href;
                                if (!(enemyName !== "Hulk" && enemyName !== "Tank")) return [3 /*break*/, 1];
                                enemyLinks.push(link);
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, fetchPage(link, page)];
                            case 2:
                                $$_1 = _b.sent();
                                if (!$$_1) {
                                    return [2 /*return*/, "continue"];
                                }
                                variantLinks = $$_1("p:contains('variant')")
                                    .nextAll("ul")
                                    .first()
                                    .find("a")
                                    .map(function (_, el) { return BASE_URL + $$_1(el).attr("href"); })
                                    .get();
                                enemyLinks.push.apply(enemyLinks, variantLinks);
                                _b.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, elements_1 = elements;
                _a.label = 2;
            case 2:
                if (!(_i < elements_1.length)) return [3 /*break*/, 5];
                element = elements_1[_i];
                return [5 /*yield**/, _loop_1(element)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, enemyLinks];
        }
    });
}); };
var getWeaponLinks = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var $, weaponLinks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchPage(WEAPONS_LIST_URL, page)];
            case 1:
                $ = _a.sent();
                if (!$) {
                    return [2 /*return*/, []];
                }
                weaponLinks = [];
                $("div.gallerytext p a").each(function (_, element) {
                    var href = $(element).attr("href");
                    if (href && !href.startsWith("/wiki/Damage")) {
                        weaponLinks.push(BASE_URL + href);
                    }
                });
                return [2 /*return*/, weaponLinks];
        }
    });
}); };
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer_1.default.launch({ headless: true })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, client.connect()];
            case 3:
                _a.sent();
                return [4 /*yield*/, scrapeAndStoreEnemies(page)];
            case 4:
                _a.sent();
                return [4 /*yield*/, scrapeAndStoreWeapons(page)];
            case 5:
                _a.sent();
                return [4 /*yield*/, client.end()];
            case 6:
                _a.sent();
                return [4 /*yield*/, browser.close()];
            case 7:
                _a.sent();
                console.log("All scraping complete!");
                return [2 /*return*/];
        }
    });
}); };
var scrapeAndStoreEnemies = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var enemyLinks, _loop_2, _i, enemyLinks_1, enemyLink;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getEnemyLinks(page)];
            case 1:
                enemyLinks = _a.sent();
                _loop_2 = function (enemyLink) {
                    var $, faction, imageURL, name_1, armorValues, armorValueFrequencyTable, _b, armorValues_1, value, calculateMode, calculateWeightedAverage, max, mode, weightedAverage;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, fetchPage(enemyLink, page)];
                            case 1:
                                $ = _c.sent();
                                if (!$) {
                                    return [2 /*return*/, "continue"];
                                }
                                faction = $("aside h3:contains('Faction') + div span a")
                                    .text()
                                    .trim();
                                imageURL = $("aside figure a img").attr("src");
                                name_1 = $("h1 span").text().trim();
                                armorValues = $("table.wikitable")
                                    .first()
                                    .find("tr td:nth-child(3) span a img")
                                    .map(function (_, element) { var _a, _b; return (_b = (_a = $(element).attr("alt")) === null || _a === void 0 ? void 0 : _a.match(/\d+/)) === null || _b === void 0 ? void 0 : _b[0]; })
                                    .get()
                                    .map(Number);
                                armorValueFrequencyTable = new Map();
                                for (_b = 0, armorValues_1 = armorValues; _b < armorValues_1.length; _b++) {
                                    value = armorValues_1[_b];
                                    armorValueFrequencyTable.set(value, (armorValueFrequencyTable.get(value) || 0) + 1);
                                }
                                calculateMode = function (frequencyTable) {
                                    var highestFrequency = 0;
                                    var hightestFrequencyValue = -1;
                                    for (var _i = 0, frequencyTable_1 = frequencyTable; _i < frequencyTable_1.length; _i++) {
                                        var _a = frequencyTable_1[_i], value = _a[0], frequency = _a[1];
                                        if (frequency > highestFrequency ||
                                            (frequency === highestFrequency &&
                                                value > hightestFrequencyValue)) {
                                            highestFrequency = frequency;
                                            hightestFrequencyValue = value;
                                        }
                                    }
                                    return hightestFrequencyValue;
                                };
                                calculateWeightedAverage = function (frequencyTable) {
                                    var weightedAverage = 0;
                                    for (var _i = 0, frequencyTable_2 = frequencyTable; _i < frequencyTable_2.length; _i++) {
                                        var _a = frequencyTable_2[_i], value = _a[0], frequency = _a[1];
                                        weightedAverage += value * (frequency / armorValues.length);
                                    }
                                    return Math.round(weightedAverage);
                                };
                                max = Math.max.apply(Math, armorValues);
                                mode = calculateMode(armorValueFrequencyTable);
                                weightedAverage = calculateWeightedAverage(armorValueFrequencyTable);
                                if (!(faction &&
                                    imageURL &&
                                    max !== undefined &&
                                    mode !== undefined &&
                                    name_1 &&
                                    weightedAverage !== undefined)) return [3 /*break*/, 3];
                                return [4 /*yield*/, storeEnemyData(faction, BASE_URL + imageURL, max, mode, name_1, weightedAverage)];
                            case 2:
                                _c.sent();
                                _c.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                };
                _i = 0, enemyLinks_1 = enemyLinks;
                _a.label = 2;
            case 2:
                if (!(_i < enemyLinks_1.length)) return [3 /*break*/, 5];
                enemyLink = enemyLinks_1[_i];
                return [5 /*yield**/, _loop_2(enemyLink)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log("Enemy Scraping complete!");
                return [2 /*return*/];
        }
    });
}); };
var scrapeAndStoreWeapons = function (page) { return __awaiter(void 0, void 0, void 0, function () {
    var weaponLinks, _i, weaponLinks_1, weaponLink, $, category, imageURL, name_2, penetration;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, getWeaponLinks(page)];
            case 1:
                weaponLinks = _c.sent();
                _i = 0, weaponLinks_1 = weaponLinks;
                _c.label = 2;
            case 2:
                if (!(_i < weaponLinks_1.length)) return [3 /*break*/, 6];
                weaponLink = weaponLinks_1[_i];
                return [4 /*yield*/, fetchPage(weaponLink, page)];
            case 3:
                $ = _c.sent();
                if (!$) {
                    return [3 /*break*/, 5];
                }
                category = $("aside section h3:contains('Weapon Category') + div")
                    .text()
                    .trim() || "Throwables";
                imageURL = $("aside figure a img").last().attr("src");
                name_2 = $("h1 span").text().trim();
                penetration = Number(((_b = (_a = $("aside section h3:contains('Penetration') + div span a img")
                    .attr("alt")) === null || _a === void 0 ? void 0 : _a.match(/\d+/)) === null || _b === void 0 ? void 0 : _b[0]) ||
                    $("aside section h3:contains('Penetration') + div")
                        .text()
                        .trim());
                if (!(category && imageURL && name_2 && penetration !== undefined)) return [3 /*break*/, 5];
                return [4 /*yield*/, storeWeaponData(category, BASE_URL + imageURL, name_2, penetration)];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6:
                console.log("Weapon Scraping complete!");
                return [2 /*return*/];
        }
    });
}); };
var storeEnemyData = function (faction, imageURL, max, mode, name, weightedAverage) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query("INSERT INTO enemies (name, faction, image_url, max, mode, weightedAverage) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (name) DO NOTHING;", [name, faction, imageURL, max, mode, weightedAverage])];
            case 1:
                _a.sent();
                console.log("Stored: ".concat(name));
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error storing enemy data:", error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var storeWeaponData = function (category, imageURL, name, penetration) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query("INSERT INTO weapons (name, category, image_url, penetration) VALUES ($1, $2, $3, $4) ON CONFLICT (name) DO NOTHING;", [name, category, imageURL, penetration])];
            case 1:
                _a.sent();
                console.log("Stored: ".concat(name));
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error("Error storing weapon data:", error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
run();
