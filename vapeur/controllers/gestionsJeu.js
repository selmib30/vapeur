const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


(async () => {
  try {
    let genre = await prisma.genre.findUnique({ where: { nom: 'Action' } });
    if (!genre) {
      genre = await prisma.genre.create({ data: { nom: 'Action' } });
    }


    let editeur = await prisma.editeur.findFirst({ where: { nom: 'Valve' } });
    if (!editeur) {
      editeur = await prisma.editeur.create({ data: { nom: 'Valve' } });
    }


    const jeu = await prisma.jeu.create({
      data: {
        nom: 'Test Game',
        description: "Jeu de démonstration ajouté pour les tests.",
        date: new Date().toISOString().split('T')[0],
        misEnAvant: true,
        editeurId: editeur.id,
        genreId: genre.id
      }
    });


    console.log('Jeu créé:', jeu);
  } catch (e) {
    console.error('Erreur:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();



