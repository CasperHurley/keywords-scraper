const axios = require("axios");
const config = require("../../config.json");
const {removeAllBeforeCharacter, addInSplitTerms} = require("../../utils/commonUtil");

function scrapeCareerfoundry1() {
    return axios.get(config.careerfoundry1URL)
}

function scrapeCareerfoundry2() {
    return axios.get(config.careerfoundry2URL)
}

function getCareerfoundry1Keywords($) {
    let keywords = [];
    $('.post-content').first().addClass("banana")
    $('.banana').find($('li')).each(function(i, elem) {
        keywords[i] = $(this).text();
    })
    return addInSplitTerms(keywords, "(", ")");
}

function getCareerfoundry2Keywords($) {
    let keywords = []
    $('h4').each(function(i, elem) {
        keywords[i] = removeAllBeforeCharacter($(this).text(), ".");
    })
    return keywords;
}

module.exports = {
    scrapeCareerfoundry1,
    scrapeCareerfoundry2,
    getCareerfoundry1Keywords,
    getCareerfoundry2Keywords
}