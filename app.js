const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bodyParser = require("body-parser")
const path = require('path');
const hbs = require("hbs");
const { seedGenres } = require('./GenreSeeder');
const jeuxRouter = require('./controllers/gestionsJeu');
const editeursRouter = require('./controllers/editeurs');
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views", "partials"));
 // On définit le dossier des partials (composants e.g. header, footer, menu...)
app.use('/jeux', jeuxRouter);
app.use('/editeurs', editeursRouter);



hbs.registerHelper("formatDate", (date) => {
    return date.toLocaleDateString();
});

(async () => {
  await seedGenres(prisma);
  
  app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
  });
})();

app.get('/', (req, res) => {
    //pour le moment editeurs est la page d'accueil
    res.redirect('/index');
});

app.use((err, req, res, next) => {
    res.status(404).send("Page Non Trouvée" ); 
});

app.use((err, req, res, next) => {
    res.status(500).send("Quelque chose s'est mal passé !");
});

// route /index  hbs
app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/genres', async (req, res) => {
        const genres = await prisma.genre.findMany();
        res.render('genres/index', { genres });
});

// Détail d'un genre
app.get('/genres/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).send('ID invalide');
  }

  try {
    const genre = await prisma.genre.findUnique({
      where: { Genre_id: id },
      include: { jeux: true }
    });

    if (!genre) {
      return res.status(404).send('Genre non trouvé');
    }

    res.render('genres/show', { genre, jeux: genre.jeux });
  } catch (e) {
    console.error('Erreur lors de la récupération du genre:', e);
    res.status(500).send('Erreur serveur');
  }
});