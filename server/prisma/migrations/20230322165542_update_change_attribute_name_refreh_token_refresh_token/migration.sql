/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `refreshToken`,
    ADD COLUMN `refresh_token` VARCHAR(191) NULL;
