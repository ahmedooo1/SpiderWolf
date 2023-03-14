/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `alt` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `genreId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_categoryId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "categoryId",
DROP COLUMN "genre",
ADD COLUMN     "genreId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "alt",
DROP COLUMN "productId",
DROP COLUMN "title";

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
