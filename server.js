const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const keywordsController = require("./keywords/keywordsController.js");
app.use("/api/scrape", keywordsController);

app.use("/", function(req, res) {
    res.sendStatus(404);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, function(req, res) {
    console.log("Express app running on port: ", PORT);
})