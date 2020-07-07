const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const keywordsController = require("./keywords/keywordsController.js");
app.use("/api/scrape", keywordsController);

app.use("/", function(req, res) {
    res.sendStatus(404);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, function(req, res) {
    console.log("Express app running on port: ", PORT);
})

// add count of each term for analytics
// add sort query values
    // req.query.sortKey
        // "keyword", "count"
    // req.query.sortDirection 
        // asc, desc