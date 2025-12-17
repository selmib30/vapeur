const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { seedGenres } = require('./GenreSeeder');

const defaultEditeurs = [
  'Ubisoft',
  'Nintendo',
  'Square Enix',
  'Capcom',
  'Electronic Arts',
  'Bethesda'
];

async function seedEditeurs(prisma) {
  try {
    const count = await prisma.editeur.count();
    if (count > 0) {
      console.log('Éditeurs déjà présents, seeding ignoré.');
      return;
    }

    await prisma.editeur.createMany({
      data: defaultEditeurs.map(name => ({ Editeur_nom: name })),
    });

    console.log('Éditeurs ajoutés avec succès.');
  } catch (error) {
    console.error('Erreur lors du seeding des éditeurs :', error);
  }
}

async function main() {
  try {
    await seedGenres(prisma);
    await seedEditeurs(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
