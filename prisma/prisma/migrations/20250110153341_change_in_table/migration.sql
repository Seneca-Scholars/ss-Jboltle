/*
  Warnings:

  - You are about to drop the column `sprites` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `ability` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ability" TEXT NOT NULL,
    "stats" TEXT NOT NULL
);
INSERT INTO "new_Pokemon" ("id", "name", "stats") SELECT "id", "name", "stats" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
