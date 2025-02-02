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
var axios_1 = require("axios");
var cheerio = require("cheerio");
var dotenv = require("dotenv");
var pg_1 = require("pg");
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
    "User-Agent": "Mozilla/5.0"
};
var fetchPage = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get(url, { headers: headers })];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, cheerio.load(data)];
            case 2:
                error_1 = _a.sent();
                console.error("Error fetching ".concat(url, ":"), error_1);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getEnemyLinks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var $, enemyLinks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchPage(ENEMY_LIST_URL)];
            case 1:
                $ = _a.sent();
                if (!$) {
                    return [2 /*return*/, []];
                }
                enemyLinks = [];
                $("table.wikitable a").each(function (_, element) {
                    var href = $(element).attr("href");
                    if (href && !href.startsWith("/wiki/File:")) {
                        enemyLinks.push(BASE_URL + href);
                    }
                });
                return [2 /*return*/, enemyLinks];
        }
    });
}); };
var getWeaponLinks = function () { return __awaiter(void 0, void 0, void 0, function () {
    var $, weaponLinks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchPage(WEAPONS_LIST_URL)];
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
var scrapeAndStoreEnemies = function () { return __awaiter(void 0, void 0, void 0, function () {
    var enemyLinks, _i, enemyLinks_1, enemyLink, $, faction, imageURL, name_1, anatomyTable;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, getEnemyLinks()];
            case 2:
                enemyLinks = _a.sent();
                _i = 0, enemyLinks_1 = enemyLinks;
                _a.label = 3;
            case 3:
                if (!(_i < enemyLinks_1.length)) return [3 /*break*/, 6];
                enemyLink = enemyLinks_1[_i];
                return [4 /*yield*/, fetchPage(enemyLink)];
            case 4:
                $ = _a.sent();
                if (!$) {
                    return [3 /*break*/, 5];
                }
                faction = $("aside h3:contains('Faction') + div span a")
                    .text()
                    .trim();
                imageURL = $("aside figure a img").attr("src");
                name_1 = $("h1 span").text().trim();
                anatomyTable = $("h2:contains('Anatomy')");
                console.log(name_1, anatomyTable.text());
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [4 /*yield*/, client.end()];
            case 7:
                _a.sent();
                console.log("Scraping complete!");
                return [2 /*return*/];
        }
    });
}); };
var scrapeAndStoreWeapons = function () { return __awaiter(void 0, void 0, void 0, function () {
    var weaponLinks, _i, weaponLinks_1, weaponLink, $, imageURL, name_2, penetration;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, client.connect()];
            case 1:
                _c.sent();
                return [4 /*yield*/, getWeaponLinks()];
            case 2:
                weaponLinks = _c.sent();
                _i = 0, weaponLinks_1 = weaponLinks;
                _c.label = 3;
            case 3:
                if (!(_i < weaponLinks_1.length)) return [3 /*break*/, 7];
                weaponLink = weaponLinks_1[_i];
                return [4 /*yield*/, fetchPage(weaponLink)];
            case 4:
                $ = _c.sent();
                if (!$) {
                    return [3 /*break*/, 6];
                }
                imageURL = $("aside figure a img").last().attr("src");
                name_2 = $("h1 span").text().trim();
                penetration = Number(((_b = (_a = $("aside section h3:contains('Penetration') + div span a img")
                    .attr("alt")) === null || _a === void 0 ? void 0 : _a.match(/\d+/)) === null || _b === void 0 ? void 0 : _b[0]) ||
                    $("aside section h3:contains('Penetration') + div")
                        .text()
                        .trim());
                if (!(imageURL && name_2 && penetration)) return [3 /*break*/, 6];
                return [4 /*yield*/, storeWeaponData(BASE_URL + imageURL, name_2, penetration)];
            case 5:
                _c.sent();
                _c.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7: return [4 /*yield*/, client.end()];
            case 8:
                _c.sent();
                console.log("Scraping complete!");
                return [2 /*return*/];
        }
    });
}); };
var storeEnemyData = function (faction, imageURL, name) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query("INSERT INTO enemies (name, faction, image_url) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING;", [name, faction, imageURL])];
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
var storeWeaponData = function (imageURL, name, penetration) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query("INSERT INTO weapons (name, image_url, penetration) VALUES ($1, $2, $3) ON CONFLICT (name) DO NOTHING;", [name, imageURL, penetration])];
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
scrapeAndStoreEnemies();
