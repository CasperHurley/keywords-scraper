const express = require("express");
const app = express();
const keywords = require("./keywords/keywords");

app.get("/*", function(req, res) {
    try {
        if (req.body && req.body.url) {
            res.json(keywords(req.body.url));
        } else {
            throw new Error(400)
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(err);
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, function(req, res) {
    console.log("Express app running on port: ", PORT);
})