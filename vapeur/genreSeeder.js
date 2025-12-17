const defaultGenres = [
  'Action',
  'Aventure',
  'Horreur',
  'FPS',
  'Fantasy',
  'Romance',
];

async function seedGenres(prisma) {
  try {
    const genreCount = await prisma.genre.count();

    if (genreCount > 0) {
      console.log('Genres déjà présents, seeding ignoré.');
      return;
    }

    await prisma.genre.createMany({
      data: defaultGenres.map(name => ({ Genre_nom: name })),
    });

    console.log('Genres ajoutés avec succès.');
  } catch (error) {
    console.error('Erreur lors du seeding des genres :', error);
  }
}

module.exports = { seedGenres };

