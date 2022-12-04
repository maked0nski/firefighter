/*
  Warnings:

  - You are about to drop the column `fathersname` on the `contact_person` table. All the data in the column will be lost.
  - You are about to drop the column `surename` on the `contact_person` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contact_person` DROP COLUMN `fathersname`,
    DROP COLUMN `surename`;
