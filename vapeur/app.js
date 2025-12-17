const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bodyParser = require("body-parser")
const path = require('path');
const hbs = require("hbs");
const { seedGenres } = require('./GenreSeeder');
const editeursRouter = require('./controllers/editeurs');
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views", "partials"));
 // On définit le dossier des partials (composants e.g. header, footer, menu...)

<<<<<<< Updated upstream
app.use('/editeurs', editeursRouter);

const jeuxRouter = require('./controllers/gestionsJeu');
app.use('/jeux', jeuxRouter);
=======

// --- 1. IMPORTATION DES ROUTES ---
const indexRouter = require('./routes/index'); // <--- On importe ton fichier index.js
const jeuxRouter = require('./routes/jeux');   // <--- On importe ton fichier jeux.js


hbs.registerHelper("formatDate", (date) => {
    return date.toLocaleDateString();
});
>>>>>>> Stashed changes

// --- 2. BRANCHEMENT DES ROUTES ---
app.use('/', indexRouter);      // Gère la page d'accueil (Jeux mis en avant)
app.use('/jeux', jeuxRouter);   // Gère la liste des jeux (/jeux)

(async () => {
  await seedGenres(prisma);
  
  app.listen(port, () => {
<<<<<<< Updated upstream
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
=======
    console.log(`Serveur démarré sur http://localhost:${port}`);
    console.log(`Test l'accueil ici : http://localhost:${port}`);
    console.log(`Test les jeux ici    : http://localhost:${port}/jeux`);
  });
})();

app.get("/", async (req, res) => {
    // on passe seulement le nom du fichier .hbs sans l'extention.
    // Le chemin est relatif au dossier views.
    // On peut aller chercher des templates dans les sous-dossiers (e.g. movies/details).
    console.log("bonjour");
    res.render("app", { title: "Accueil - Vapeur" });
});

module.exports = app;
>>>>>>> Stashed changes
