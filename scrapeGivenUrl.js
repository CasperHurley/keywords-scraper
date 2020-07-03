const axios = require("axios");
const cheerio = require("cheerio");

function scrape(url) {
    axios.get(url).then((response) => {
        let $ = cheerio.load(response.data);
        let siteText = $('main').text();
        
    }).catch(err => {
        console.log(err);
    })
}

module.exports = scrape;