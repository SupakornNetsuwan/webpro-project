/*
  Warnings:

  - Made the column `refreshToken` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `refreshToken` VARCHAR(191) NOT NULL DEFAULT '';
