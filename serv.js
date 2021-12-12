//dans le package.json, un commande nommée heroku se lancera et démarrera ce fichier contenant un mini serveur express
const express = require("express");
const app = express();
//heroku pour faire tourner l'app a besoin d'un mini seveur pour fonctionner
//heroku va chercher son index.html dans le fichier dist
app.use(express.static("./dist/pfe"));

app.get("/*", function (req, res) {
    res.sendFile("index.html", { root: "dist/pfe" });
});

app.listen(process.env.PORT  || 8080);

//debug :: 
//console.log(`Running on port ${process.env.PORT || 8080}`);