const express = require("express");
const app = express();
const keywords = require("./keywords/keywords");

app.get("/api/url/:encodedURL", function (req, res) {
    let url = "https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/"
    keywords(url)
})

app.get("/*", function(req, res) {
    res.sendStatus(404);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, function(req, res) {
    console.log("Express app running on port: ", PORT);
})