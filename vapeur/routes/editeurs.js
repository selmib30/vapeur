const express = require('express');
const router = express.Router();
const editeursController = require('../controllers/editeurs');

// GET /editeurs - Affiche la liste des éditeurs
router.get('/', editeursController.listeEditeurs); 

// GET /editeurs/creation - Formulaire de création
router.get('/creation', editeursController.getCreateEditeur); 
// POST /editeurs/creation - Traite la création
router.post('/creation', editeursController.postCreateEditeur);

// GET /editeurs/:id - Affiche les jeux de l'éditeur (détail)
router.get('/:id', editeursController.getEditeurById); 

// GET /editeurs/:id/modification - Formulaire de modification
router.get('/:id/modification', editeursController.getEditEditeur); 
// POST /editeurs/:id/modification - Traite la modification
router.post('/:id/modification', editeursController.postEditEditeur); 

// POST /editeurs/:id/suppression - Traite la suppression
router.post('/:id/suppression', editeursController.postDeleteEditeur);

module.exports = router;