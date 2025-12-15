/*
  Warnings:

  - You are about to drop the `jeux` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "jeux";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Jeu" (
    "Jeu_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Jeu_nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_sortie" DATETIME NOT NULL,
    "mis_en_avant" BOOLEAN NOT NULL DEFAULT false,
    "genreId" INTEGER NOT NULL,
    "editeurId" INTEGER NOT NULL,
    CONSTRAINT "Jeu_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("Genre_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Jeu_editeurId_fkey" FOREIGN KEY ("editeurId") REFERENCES "Editeur" ("Editeur_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Editeur" (
    "Editeur_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Editeur_nom" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Genre" (
    "Genre_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Genre_nom" TEXT NOT NULL
);
