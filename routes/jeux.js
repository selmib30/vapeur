const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// GET /jeux - Affiche la liste complète
router.get('/', async (req, res, next) => {
  try {
    const jeux = await prisma.jeu.findMany({
      include: { Editeur: true, Genre: true },
      orderBy: { nom: 'asc' }
    });


    res.render('jeux/index', { title: 'Bibliothèque de Jeux', jeux });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// GET /jeux/new - Affiche le formulaire d'ajout
router.get('/new', async (req, res, next) => {
  try {
    const genres = await prisma.genre.findMany({ orderBy: { nom: 'asc' } });
    const editeurs = await prisma.editeur.findMany({ orderBy: { nom: 'asc' } });
    res.render('jeux/form', { title: 'Ajouter un jeu', genres, editeurs });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// POST /jeux - Création d'un jeu depuis le formulaire
router.post('/', async (req, res, next) => {
  try {
    const { nom, description, date, misEnAvant, genreId, editeurId } = req.body;
    await prisma.jeu.create({
      data: {
        nom,
        description,
        date,
        misEnAvant: misEnAvant === 'on',
        genreId: parseInt(genreId, 10),
        editeurId: parseInt(editeurId, 10)
      }
    });
    res.redirect('/jeux');
  } catch (error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;

