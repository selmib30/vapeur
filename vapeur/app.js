const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bodyParser = require("body-parser")
const path = require('path');
const hbs = require("hbs");

const app = express();
const port = 8000;
app.use(express.urlencoded({ extended: true }));

// Configuration de Handlebars pour Express
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views", "partials")); // On définit le dossier des partials (composants e.g. header, footer, menu...)


const editeursRouter = require('./controllers/editeurs');
app.use('/editeurs', editeursRouter);


app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});


app.get('/', (req, res) => {
    //pour le moment editeurs est la page d'accueil
    res.redirect('/editeurs');
});

app.use((err, req, res, next) => {
    res.status(404).send("Page Non Trouvée" ); 
});

app.use((err, req, res, next) => {
    res.status(500).send("Quelque chose s'est mal passé !");
});