const axios = require("axios");
const config = require("../../config.json");
const {removeAllBeforeCharacter, addInSplitTerms} = require("../../utils/commonUtil");

function scrapeParkersoftware() {
    return axios.get(config.parkersoftwareURL)
}

function getParkersoftwareKeywords($) {
    let keywords = [];
    $('.wp-block-separator').eq(1).prevAll().find($('strong')).map(function(i, elem) {
        keywords[i] = removeAllBeforeCharacter($(this).text(), "·");
    })
    return addInSplitTerms(addInSplitTerms(keywords, "/"), "(", ")")
}

module.exports = {
    scrapeParkersoftware,
    getParkersoftwareKeywords
}