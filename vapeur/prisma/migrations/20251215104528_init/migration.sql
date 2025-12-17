/*
  Warnings:

  - You are about to drop the `jeux` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "jeux";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "jeu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "misEnAvant" BOOLEAN NOT NULL,
    "editeurId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,
    CONSTRAINT "jeu_editeurId_fkey" FOREIGN KEY ("editeurId") REFERENCES "Editeur" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "jeu_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Editeur" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_nom_key" ON "Genre"("nom");
