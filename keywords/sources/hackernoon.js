const axios = require("axios");
const config = require("../../config.json");
const _ = require("lodash");

function scrapeHackernoon() {
    return axios.get(config.hackernoonURL)
}

function getHackernoonKeywords($) {
    let keywords = [];
    $('footer').prevAll().find($('strong')).map(function(i, elem) {
        keywords[i] = $(this).text().trim();
    })
    return _.compact(keywords)
}

module.exports = {
    scrapeHackernoon,
    getHackernoonKeywords
}