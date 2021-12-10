const express = require("express");
const app = express();
//heroku va chercher son index.html dans le fichier dist
app.use(express.static("./dist/pfe"));

app.get("/*", function (req, res) {
    res.sendFile("index.html", { root: "dist/pfe" });
});

app.listen(process.env.PORT  || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`);