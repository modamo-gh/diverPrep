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
var scrapeAndStoreEnemies = function () { return __awaiter(void 0, void 0, void 0, function () {
    var enemyLinks, _i, enemyLinks_1, enemyLink, $, name_1, imageURL;
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
                if (!(_i < enemyLinks_1.length)) return [3 /*break*/, 7];
                enemyLink = enemyLinks_1[_i];
                return [4 /*yield*/, fetchPage(enemyLink)];
            case 4:
                $ = _a.sent();
                if (!$) {
                    return [3 /*break*/, 6];
                }
                name_1 = $("h1 span").text().trim();
                imageURL = $("aside figure a img").attr("src");
                if (!(name_1 && imageURL)) return [3 /*break*/, 6];
                return [4 /*yield*/, storeEnemyData(name_1, BASE_URL + imageURL)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7: return [4 /*yield*/, client.end()];
            case 8:
                _a.sent();
                console.log("Scraping complete!");
                return [2 /*return*/];
        }
    });
}); };
var storeEnemyData = function (name, imageURL) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, client.query("INSERT INTO enemies (name, image_url) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING;", [name, imageURL])];
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
scrapeAndStoreEnemies();
