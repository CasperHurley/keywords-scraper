const axios = require("axios");
const cheerio = require("cheerio");
const keywords = require("./keywords/keywords");

function scrape(url) {
    return keywords(url)
}

module.exports = scrape;