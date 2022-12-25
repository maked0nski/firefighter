/*
  Warnings:

  - You are about to drop the column `passwordResetAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `passwordResetAt`,
    DROP COLUMN `passwordResetToken`,
    DROP COLUMN `verified`,
    ADD COLUMN `status` ENUM('pending', 'active', 'blocked') NOT NULL DEFAULT 'pending',
    ADD COLUMN `verificationCodeAt` DATETIME(3) NULL;
