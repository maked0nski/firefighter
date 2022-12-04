-- DropForeignKey
ALTER TABLE `observation` DROP FOREIGN KEY `Observation_sim_card_fkey`;

-- AlterTable
ALTER TABLE `observation` MODIFY `sim_card` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Observation` ADD CONSTRAINT `Observation_sim_card_fkey` FOREIGN KEY (`sim_card`) REFERENCES `Sim_card`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
