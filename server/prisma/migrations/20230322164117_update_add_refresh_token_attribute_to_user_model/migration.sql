/*
  Warnings:

  - Added the required column `refreshToken` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL,
    ALTER COLUMN `firstname` DROP DEFAULT,
    ALTER COLUMN `lastname` DROP DEFAULT,
    ALTER COLUMN `name` DROP DEFAULT,
    ALTER COLUMN `picture` DROP DEFAULT;
