// index.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Route pour la page d'accueil
router.get('/', async (req, res, next) => {
  try {
    // On récupère les jeux où "misEnAvant" est vrai
    // On inclut ("include") l'Editeur et le Genre pour pouvoir afficher leur nom
    const jeuxMisEnAvant = await prisma.jeu.findMany({
      where: {
        misEnAvant: true
      },
      include: {
        Editeur: true,
        Genre: true
      },
      orderBy: {
        nom: 'asc' // Tri alphabétique (requis par le cahier des charges)
      }
    });
// On passe la liste 'jeuxMisEnAvant' à la vue
    res.render('index', {
      title: 'Accueil - Vapeur',
      jeux: jeuxMisEnAvant
    });


  } catch (error) {
    // Si une erreur survient, on l'affiche et on passe au gestionnaire d'erreur
    console.error("Erreur lors de la récupération des jeux :", error);
    next(error);
  }
});


module.exports = router;

