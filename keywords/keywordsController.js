const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
// const redis = require("redis");
// const client = redis.createClient();
const _ = require("lodash");
const {allSameCase, getNumberOfOccurences} = require("../utils/commonUtil")
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
const {scrapeHackernoon, getHackernoonKeywords} = require("./sources/hackernoon");
const {scrapeRaygun, getRaygunKeywords} = require("./sources/raygun");

router.post("/", function(req, res) {
    if (req.body && req.body.scrapeURL) {
        axios.all([
            axios.get(req.body.scrapeURL),
            scrapeZiprecruiter(),
            scrapeJobscan(),
            scrapeEcpiUniversity(),
            scrapeCareerfoundry1(),
            scrapeCareerfoundry2(),
            scrapeSkillcrush(),
            scrapeParkersoftware(),
            scrapeWikipediaJsLibs(),
            scrapeWikipediaJavaFwrks(),        
            scrapeHackernoon(),
            scrapeRaygun()
        ]).then(
            axios.spread(
                function(
                    scrapeUrlResp,
                    ziprecruiterResp, 
                    jobscanResp,
                    ecpiUniversityResp,
                    careerfoundry1Resp,
                    careerfoundry2Resp,
                    skillcrushResp,
                    parkersoftwareResp,
                    wikipediaJsLibsResp,
                    wikipediaJavaFwrksResp,
                    hackernoonResp,
                    raygunResp
                ) {
                    res.json(
                        extractKeywordsFromScrapeURL(
                            req.body.scrapeURL,
                            cheerio.load(scrapeUrlResp.data),
                            gatherAllKeywords(
                                getZiprecruiterKeywords(cheerio.load(ziprecruiterResp.data)),
                                getJobscanKeywords(cheerio.load(jobscanResp.data)),
                                getEcpiUniversityKeywords(cheerio.load(ecpiUniversityResp.data)),
                                getCareerfoundry1Keywords(cheerio.load(careerfoundry1Resp.data)),
                                getCareerfoundry2Keywords(cheerio.load(careerfoundry2Resp.data)),
                                getSkillcrushKeywords(cheerio.load(skillcrushResp.data)),
                                getParkersoftwareKeywords(cheerio.load(parkersoftwareResp.data)),
                                getWikipediaJsLibsKeywords(cheerio.load(wikipediaJsLibsResp.data)),
                                getWikipediaJavaFwrksKeywords(cheerio.load(wikipediaJavaFwrksResp.data)),
                                getHackernoonKeywords(cheerio.load(hackernoonResp.data)),
                                getRaygunKeywords(cheerio.load(raygunResp.data))
                            )
                        )
                    )
                }
            )
        ).catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(400);
    }
})

function gatherAllKeywords(
    ziprecruiterKeywords, 
    jobscanKeywords, 
    ecpiUniversityKeywords,
    careerfoundry1Keywords,
    careerfoundry2Keywords,
    skillcrushKeywords,
    parkersoftwareKeywords,
    wikipediaJsLibsKeywords,
    wikipediaJavaFwrksKeywords,
    hackernoonKeywords,
    raygunKeywords
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
            allSameCase(wikipediaJavaFwrksKeywords),
            allSameCase(hackernoonKeywords),
            allSameCase(raygunKeywords)
        )
    return allKeywords.sort();
}

function extractKeywordsFromScrapeURL(scrapeURL, $, allKeywords) {
    $('body *').contents().find("script,noscript,style").remove()
    var siteText = $('body *').contents().map(function() {
        return (this.type === 'text') ? $(this).text()+' ' : '';
    }).get().join('');

    // getNumberOfOccurences();

    return allKeywords.filter((term) => {
        return siteText.toUpperCase().includes(term);
    })
}

module.exports = router;