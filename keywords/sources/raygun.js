const axios = require("axios");
const config = require("../../config.json");
const {removeAllBeforeCharacter} = require("../../utils/commonUtil");

function scrapeRaygun() {
    return axios.get(config.raygunURL)
}

function getRaygunKeywords($) {
    let keywords = [];
    $('.single-post-content').find($('h3')).map(function(i, elem) {
        keywords[i] = $(this).text();
    })
    return keywords.map(term => {
        return removeAllBeforeCharacter(term);
    })
}

module.exports = {
    scrapeRaygun,
    getRaygunKeywords
}