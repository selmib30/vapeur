/*
  Warnings:

  - You are about to drop the column `genreId` on the `Jeu` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_GenreToJeu" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GenreToJeu_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre" ("Genre_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GenreToJeu_B_fkey" FOREIGN KEY ("B") REFERENCES "Jeu" ("Jeu_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Jeu" (
    "Jeu_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Jeu_nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_sortie" DATETIME NOT NULL,
    "mis_en_avant" BOOLEAN NOT NULL DEFAULT false,
    "editeurId" INTEGER NOT NULL,
    CONSTRAINT "Jeu_editeurId_fkey" FOREIGN KEY ("editeurId") REFERENCES "Editeur" ("Editeur_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Jeu" ("Jeu_id", "Jeu_nom", "date_sortie", "description", "editeurId", "mis_en_avant") SELECT "Jeu_id", "Jeu_nom", "date_sortie", "description", "editeurId", "mis_en_avant" FROM "Jeu";
DROP TABLE "Jeu";
ALTER TABLE "new_Jeu" RENAME TO "Jeu";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToJeu_AB_unique" ON "_GenreToJeu"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToJeu_B_index" ON "_GenreToJeu"("B");
