/*
  Warnings:

  - You are about to drop the column `timeLeft` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[verificationCode]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `timeLeft`,
    ADD COLUMN `passwordResetAt` DATETIME(3) NULL,
    ADD COLUMN `passwordResetToken` VARCHAR(191) NULL,
    ADD COLUMN `verificationCode` VARCHAR(500) NULL,
    ADD COLUMN `verified` BOOLEAN NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `users_verificationCode_key` ON `users`(`verificationCode`);
