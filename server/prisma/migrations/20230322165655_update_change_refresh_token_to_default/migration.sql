/*
  Warnings:

  - Made the column `refresh_token` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `refresh_token` VARCHAR(191) NOT NULL DEFAULT '';
