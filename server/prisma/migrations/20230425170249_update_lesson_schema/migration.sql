/*
  Warnings:

  - Added the required column `lesson_intro` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Lesson` ADD COLUMN `lesson_intro` VARCHAR(191) NOT NULL;
