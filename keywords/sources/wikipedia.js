const axios = require("axios");
const config = require("../../config.json");
const {addInSplitTerms} = require("../../utils/commonUtil");

function scrapeWikipediaJsLibs() {
    return axios.get(config.wikipediaJsLibsURL);
}

function scrapeWikipediaJavaFwrks() {
    return axios.get(config.wikipediaJavaFwrksURL);
}

function getWikipediaJsLibsKeywords($) {
    let keywords = [];
    $('.reflist').prevUntil('#Charting_libraries').find($('li')).not('.toclevel-1').not('.toclevel-2').not('.nv-view').not('.nv-talk').not('.nv-edit').map(function(i, elem) {
        keywords[i] = $(this).text();
    })
    return keywords
}

function getWikipediaJavaFwrksKeywords($) {
    let keywords = ["APACHE"];
    $('td').find($('a')).map(function(i, elem) {
        keywords[i] = $(this).text().replace("Apache ", "");
    })
    return addInSplitTerms(keywords, "(", ")")
}

module.exports = {
    scrapeWikipediaJsLibs,
    scrapeWikipediaJavaFwrks,
    getWikipediaJsLibsKeywords,
    getWikipediaJavaFwrksKeywords
}