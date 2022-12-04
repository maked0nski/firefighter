/*
  Warnings:

  - You are about to drop the column `sim_card` on the `observation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sim_cardId]` on the table `Observation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `observation` DROP FOREIGN KEY `Observation_sim_card_fkey`;

-- AlterTable
ALTER TABLE `observation` DROP COLUMN `sim_card`,
    ADD COLUMN `sim_cardId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Observation_sim_cardId_key` ON `Observation`(`sim_cardId`);

-- AddForeignKey
ALTER TABLE `Observation` ADD CONSTRAINT `Observation_sim_cardId_fkey` FOREIGN KEY (`sim_cardId`) REFERENCES `Sim_card`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
