const axios = require("axios");
const config = require("../../config.json");
const _ = require("lodash")
const {
    combineArraysOfObjectsNoDuplicates,
    getOnlyKeywordsFromArrayOfObjects,
    getUnionOfArrays
} = require("../../utils/commonUtil")

function scrapeZiprecruiter() {
    return axios.get(config.ziprecruiterURL)
}

function getZiprecruiterKeywords($) {
    let resumeKeywords = []
    $('.pair').find($('.label')).each(function(i, elem) {
        resumeKeywords[i] = $(this).text();
    });
    let split = $('script')[10].children[0].data.split("=")
    let topSkillsJobDescriptions = split[3].substring(0, split[3].indexOf(']') + 1);
    let topSkillsResumes = split[4].substring(0, split[4].indexOf(']') + 1);
    return (
        getUnionOfArrays(
            resumeKeywords,
            getOnlyKeywordsFromArrayOfObjects(
                combineArraysOfObjectsNoDuplicates(
                    JSON.parse(topSkillsJobDescriptions),
                    JSON.parse(topSkillsResumes),
                    "label"
                ),
                "label"
            )
        )
    );
}

module.exports = {
    scrapeZiprecruiter,
    getZiprecruiterKeywords
}