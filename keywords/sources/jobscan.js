const axios = require("axios");
const config = require("../../config.json");

function scrapeJobscan() {
    return axios.get(config.jobscanURL)
}

function getJobscanKeywords($) {
    let keywords = [];
    $('.col-lg-6').find($('small')).map(function(i, elem) {
        keywords[i] = $(this).text();
    })
    return keywords
}

module.exports = {
    scrapeJobscan,
    getJobscanKeywords
}