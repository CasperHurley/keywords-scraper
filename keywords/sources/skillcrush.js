const axios = require("axios");
const config = require("../../config.json");
const {removeAllBeforeCharacter, addInSplitTerms} = require("../../utils/commonUtil");

function scrapeSkillcrush() {
    return axios.get(config.skillcrushURL)
}

function getSkillcrushKeywords($) {
    let keywords = [];
    $('.blog-content').find($('h3')).map(function(i, elem) {
        keywords[i] = removeAllBeforeCharacter($(this).text(), ".");
    })
    return addInSplitTerms(keywords, "(", ")");
}

module.exports = {
    scrapeSkillcrush,
    getSkillcrushKeywords
}