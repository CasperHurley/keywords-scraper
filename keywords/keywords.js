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
const {
    scrapeWikipediaJsLibs,
    scrapeWikipediaJavaFwrks,
    getWikipediaJsLibsKeywords,
    getWikipediaJavaFwrksKeywords
} = require("./sources/wikipedia");


function keywords() {
    axios.all([
        scrapeZiprecruiter(),
        scrapeJobscan(),
        scrapeEcpiUniversity(),
        scrapeCareerfoundry1(),
        scrapeCareerfoundry2(),
        scrapeSkillcrush(),
        scrapeParkersoftware(),
        scrapeWikipediaJsLibs(),
        scrapeWikipediaJavaFwrks()
    ]).then(
        axios.spread(
            function(
                ziprecruiterResp, 
                jobscanResp,
                ecpiUniversityResp,
                careerfoundry1Resp,
                careerfoundry2Resp,
                skillcrushResp,
                parkersoftwareResp,
                wikipediaJsLibsResp,
                wikipediaJavaFwrksResp
            ) {
                gatherAllKeywords(
                    getZiprecruiterKeywords(cheerio.load(ziprecruiterResp.data)),
                    getJobscanKeywords(cheerio.load(jobscanResp.data)),
                    getEcpiUniversityKeywords(cheerio.load(ecpiUniversityResp.data)),
                    getCareerfoundry1Keywords(cheerio.load(careerfoundry1Resp.data)),
                    getCareerfoundry2Keywords(cheerio.load(careerfoundry2Resp.data)),
                    getSkillcrushKeywords(cheerio.load(skillcrushResp.data)),
                    getParkersoftwareKeywords(cheerio.load(parkersoftwareResp.data)),
                    getWikipediaJsLibsKeywords(cheerio.load(wikipediaJsLibsResp.data)),
                    getWikipediaJavaFwrksKeywords(cheerio.load(wikipediaJavaFwrksResp.data))
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
    parkersoftwareKeywords,
    wikipediaJsLibsKeywords,
    wikipediaJavaFwrksKeywords
) {
    let allKeywords = 
        _.union(
            allSameCase(ziprecruiterKeywords), 
            allSameCase(jobscanKeywords),
            allSameCase(ecpiUniversityKeywords),
            allSameCase(careerfoundry1Keywords),
            allSameCase(careerfoundry2Keywords),
            allSameCase(skillcrushKeywords),
            allSameCase(parkersoftwareKeywords),
            allSameCase(wikipediaJsLibsKeywords),
            allSameCase(wikipediaJavaFwrksKeywords)
        )
    console.log(allKeywords.sort());
    return allKeywords.sort();
}

module.exports = keywords