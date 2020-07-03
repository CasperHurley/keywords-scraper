const axios = require("axios");
const config = require("../../config.json");

function scrapeEcpiUniversity() {
    return axios.get(config.ecpiUniversityURL)
}

function getEcpiUniversityKeywords($) {
    let keywords = [];
    $('ol').find($('li')).each(function(i, elem) {
        keywords[i] = $(this).text();
    })
    return keywords
}

module.exports = {
    scrapeEcpiUniversity,
    getEcpiUniversityKeywords
}