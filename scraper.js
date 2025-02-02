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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
    var $, enemyLinks, elements, _loop_1, elements_1, elements_1_1, element, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, fetchPage(ENEMY_LIST_URL)];
            case 1:
                $ = _b.sent();
                if (!$) {
                    return [2 /*return*/, []];
                }
                enemyLinks = [];
                elements = $("table.wikitable a").toArray();
                _loop_1 = function (element) {
                    var href, enemyName, link, $$_1, variantLinks;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                href = $(element).attr("href");
                                if (!(href && !href.startsWith("/wiki/File:"))) return [3 /*break*/, 3];
                                enemyName = $(element).text().trim();
                                link = BASE_URL + href;
                                if (!(enemyName !== "Hulk" && enemyName !== "Tank")) return [3 /*break*/, 1];
                                enemyLinks.push(link);
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, fetchPage(link)];
                            case 2:
                                $$_1 = _c.sent();
                                if (!$$_1) {
                                    return [2 /*return*/, "continue"];
                                }
                                variantLinks = $$_1("p:contains('variant')")
                                    .nextAll("ul")
                                    .first()
                                    .find("a")
                                    .map(function (_, el) { return BASE_URL + $$_1(el).attr("href"); })
                                    .get();
                                enemyLinks.push.apply(enemyLinks, __spreadArray([], __read(variantLinks), false));
                                _c.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                };
                _b.label = 2;
            case 2:
                _b.trys.push([2, 7, 8, 9]);
                elements_1 = __values(elements), elements_1_1 = elements_1.next();
                _b.label = 3;
            case 3:
                if (!!elements_1_1.done) return [3 /*break*/, 6];
                element = elements_1_1.value;
                return [5 /*yield**/, _loop_1(element)];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                elements_1_1 = elements_1.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/, enemyLinks];
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
    var enemyLinks, _loop_2, enemyLinks_1, enemyLinks_1_1, enemyLink, e_2_1;
    var e_2, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, client.connect()];
            case 1:
                _b.sent();
                return [4 /*yield*/, getEnemyLinks()];
            case 2:
                enemyLinks = _b.sent();
                _loop_2 = function (enemyLink) {
                    var $, faction, imageURL, name_1, armorValues, armorValueFrequencyTable, armorValues_1, armorValues_1_1, value, calculateMode, calculateWeightedAverage, max, mode, weightedAverage;
                    var e_3, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, fetchPage(enemyLink)];
                            case 1:
                                $ = _d.sent();
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
                                try {
                                    for (armorValues_1 = (e_3 = void 0, __values(armorValues)), armorValues_1_1 = armorValues_1.next(); !armorValues_1_1.done; armorValues_1_1 = armorValues_1.next()) {
                                        value = armorValues_1_1.value;
                                        armorValueFrequencyTable.set(value, (armorValueFrequencyTable.get(value) || 0) + 1);
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (armorValues_1_1 && !armorValues_1_1.done && (_c = armorValues_1.return)) _c.call(armorValues_1);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                                calculateMode = function (frequencyTable) {
                                    var e_4, _a;
                                    var highestFrequency = 0;
                                    var hightestFrequencyValue = -1;
                                    try {
                                        for (var frequencyTable_1 = (e_4 = void 0, __values(frequencyTable)), frequencyTable_1_1 = frequencyTable_1.next(); !frequencyTable_1_1.done; frequencyTable_1_1 = frequencyTable_1.next()) {
                                            var _b = __read(frequencyTable_1_1.value, 2), value = _b[0], frequency = _b[1];
                                            if (frequency > highestFrequency ||
                                                (frequency === highestFrequency &&
                                                    value > hightestFrequencyValue)) {
                                                highestFrequency = frequency;
                                                hightestFrequencyValue = value;
                                            }
                                        }
                                    }
                                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                    finally {
                                        try {
                                            if (frequencyTable_1_1 && !frequencyTable_1_1.done && (_a = frequencyTable_1.return)) _a.call(frequencyTable_1);
                                        }
                                        finally { if (e_4) throw e_4.error; }
                                    }
                                    return hightestFrequencyValue;
                                };
                                calculateWeightedAverage = function (frequencyTable) {
                                    var e_5, _a;
                                    var weightedAverage = 0;
                                    try {
                                        for (var frequencyTable_2 = (e_5 = void 0, __values(frequencyTable)), frequencyTable_2_1 = frequencyTable_2.next(); !frequencyTable_2_1.done; frequencyTable_2_1 = frequencyTable_2.next()) {
                                            var _b = __read(frequencyTable_2_1.value, 2), value = _b[0], frequency = _b[1];
                                            weightedAverage += value * (frequency / armorValues.length);
                                        }
                                    }
                                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                    finally {
                                        try {
                                            if (frequencyTable_2_1 && !frequencyTable_2_1.done && (_a = frequencyTable_2.return)) _a.call(frequencyTable_2);
                                        }
                                        finally { if (e_5) throw e_5.error; }
                                    }
                                    return Math.round(weightedAverage);
                                };
                                max = Math.max.apply(Math, __spreadArray([], __read(armorValues), false));
                                mode = calculateMode(armorValueFrequencyTable);
                                weightedAverage = calculateWeightedAverage(armorValueFrequencyTable);
                                if (!(faction && imageURL && max && mode && name_1 && weightedAverage)) return [3 /*break*/, 3];
                                return [4 /*yield*/, storeEnemyData(faction, BASE_URL + imageURL, max, mode, name_1, weightedAverage)];
                            case 2:
                                _d.sent();
                                _d.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                };
                _b.label = 3;
            case 3:
                _b.trys.push([3, 8, 9, 10]);
                enemyLinks_1 = __values(enemyLinks), enemyLinks_1_1 = enemyLinks_1.next();
                _b.label = 4;
            case 4:
                if (!!enemyLinks_1_1.done) return [3 /*break*/, 7];
                enemyLink = enemyLinks_1_1.value;
                return [5 /*yield**/, _loop_2(enemyLink)];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                enemyLinks_1_1 = enemyLinks_1.next();
                return [3 /*break*/, 4];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_2_1 = _b.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 10];
            case 9:
                try {
                    if (enemyLinks_1_1 && !enemyLinks_1_1.done && (_a = enemyLinks_1.return)) _a.call(enemyLinks_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 10: return [4 /*yield*/, client.end()];
            case 11:
                _b.sent();
                console.log("Scraping complete!");
                return [2 /*return*/];
        }
    });
}); };
var scrapeAndStoreWeapons = function () { return __awaiter(void 0, void 0, void 0, function () {
    var weaponLinks, weaponLinks_1, weaponLinks_1_1, weaponLink, $, imageURL, name_2, penetration, e_6_1;
    var e_6, _a;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, client.connect()];
            case 1:
                _d.sent();
                return [4 /*yield*/, getWeaponLinks()];
            case 2:
                weaponLinks = _d.sent();
                _d.label = 3;
            case 3:
                _d.trys.push([3, 9, 10, 11]);
                weaponLinks_1 = __values(weaponLinks), weaponLinks_1_1 = weaponLinks_1.next();
                _d.label = 4;
            case 4:
                if (!!weaponLinks_1_1.done) return [3 /*break*/, 8];
                weaponLink = weaponLinks_1_1.value;
                return [4 /*yield*/, fetchPage(weaponLink)];
            case 5:
                $ = _d.sent();
                if (!$) {
                    return [3 /*break*/, 7];
                }
                imageURL = $("aside figure a img").last().attr("src");
                name_2 = $("h1 span").text().trim();
                penetration = Number(((_c = (_b = $("aside section h3:contains('Penetration') + div span a img")
                    .attr("alt")) === null || _b === void 0 ? void 0 : _b.match(/\d+/)) === null || _c === void 0 ? void 0 : _c[0]) ||
                    $("aside section h3:contains('Penetration') + div")
                        .text()
                        .trim());
                if (!(imageURL && name_2 && penetration)) return [3 /*break*/, 7];
                return [4 /*yield*/, storeWeaponData(BASE_URL + imageURL, name_2, penetration)];
            case 6:
                _d.sent();
                _d.label = 7;
            case 7:
                weaponLinks_1_1 = weaponLinks_1.next();
                return [3 /*break*/, 4];
            case 8: return [3 /*break*/, 11];
            case 9:
                e_6_1 = _d.sent();
                e_6 = { error: e_6_1 };
                return [3 /*break*/, 11];
            case 10:
                try {
                    if (weaponLinks_1_1 && !weaponLinks_1_1.done && (_a = weaponLinks_1.return)) _a.call(weaponLinks_1);
                }
                finally { if (e_6) throw e_6.error; }
                return [7 /*endfinally*/];
            case 11: return [4 /*yield*/, client.end()];
            case 12:
                _d.sent();
                console.log("Scraping complete!");
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
scrapeAndStoreWeapons();
