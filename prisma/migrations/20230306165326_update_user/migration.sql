/*
  Warnings:

  - You are about to alter the column `pseudo` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(80)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - Made the column `pseudo` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastname" DROP NOT NULL,
ALTER COLUMN "pseudo" SET NOT NULL,
ALTER COLUMN "pseudo" SET DATA TYPE VARCHAR(80),
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(120);
