const axios = require("axios");
const cheerio = require("cheerio");
// const redis = require("redis");
// const client = redis.createClient();
const _ = require("lodash");
const {allSameCase} = require("../utils/commonUtil")
const {scrapeZiprecruiter, getZiprecruiterKeywords} = require("./sources/ziprecruiter");
const {scrapeJobscan, getJobscanKeywords} = require("./sources/jobscan");
const {scrapeEcpiUniversity, getEcpiUniversityKeywords} = require("./sources/ecpiUniversity");
const {
    scrapeCareerfoundry1, getCareerfoundry1Keywords,
    scrapeCareerfoundry2, getCareerfoundry2Keywords
} = require("./sources/careerfoundry");
const {scrapeSkillcrush, getSkillcrushKeywords} = require("./sources/skillcrush");
const {scrapeParkersoftware, getParkersoftwareKeywords} = require("./sources/parkersoftware");

function keywords() {
    axios.all([
        scrapeZiprecruiter(),
        scrapeJobscan(),
        scrapeEcpiUniversity(),
        scrapeCareerfoundry1(),
        scrapeCareerfoundry2(),
        scrapeSkillcrush(),
        scrapeParkersoftware()
    ]).then(
        axios.spread(
            function(
                ziprecruiterResp, 
                jobscanResp,
                ecpiUniversityResp,
                careerfoundry1Resp,
                careerfoundry2Resp,
                skillcrushResp,
                parkersoftwareResp
            ) {
                gatherAllKeywords(
                    getZiprecruiterKeywords(cheerio.load(ziprecruiterResp.data)),
                    getJobscanKeywords(cheerio.load(jobscanResp.data)),
                    getEcpiUniversityKeywords(cheerio.load(ecpiUniversityResp.data)),
                    getCareerfoundry1Keywords(cheerio.load(careerfoundry1Resp.data)),
                    getCareerfoundry2Keywords(cheerio.load(careerfoundry2Resp.data)),
                    getSkillcrushKeywords(cheerio.load(skillcrushResp.data)),
                    getParkersoftwareKeywords(cheerio.load(parkersoftwareResp.data))
                )
            }
        )
    ).catch(err => {
        console.log(err);
    })
}

function gatherAllKeywords(
    ziprecruiterKeywords, 
    jobscanKeywords, 
    ecpiUniversityKeywords,
    careerfoundry1Keywords,
    careerfoundry2Keywords,
    skillcrushKeywords,
    parkersoftwareKeywords
) {
    let allKeywords = 
        _.union(
            allSameCase(ziprecruiterKeywords), 
            allSameCase(jobscanKeywords),
            allSameCase(ecpiUniversityKeywords),
            allSameCase(careerfoundry1Keywords),
            allSameCase(careerfoundry2Keywords),
            allSameCase(skillcrushKeywords),
            allSameCase(parkersoftwareKeywords)
        )
    console.log(allKeywords.sort());
    return allKeywords.sort();
}

module.exports = keywords