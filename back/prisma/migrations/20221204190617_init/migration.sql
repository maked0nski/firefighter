/*
  Warnings:

  - You are about to drop the column `sim_cardId` on the `observation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sim_cardNumber]` on the table `Observation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `observation` DROP FOREIGN KEY `Observation_sim_cardId_fkey`;

-- AlterTable
ALTER TABLE `observation` DROP COLUMN `sim_cardId`,
    ADD COLUMN `sim_cardNumber` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Observation_sim_cardNumber_key` ON `Observation`(`sim_cardNumber`);

-- AddForeignKey
ALTER TABLE `Observation` ADD CONSTRAINT `Observation_sim_cardNumber_fkey` FOREIGN KEY (`sim_cardNumber`) REFERENCES `Sim_card`(`number`) ON DELETE SET NULL ON UPDATE CASCADE;
