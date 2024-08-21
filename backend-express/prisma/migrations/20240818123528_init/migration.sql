/*
  Warnings:

  - You are about to drop the column `published` on the `Note` table. All the data in the column will be lost.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "published";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
