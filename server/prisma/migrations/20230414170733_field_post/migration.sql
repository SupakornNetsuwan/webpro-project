/*
  Warnings:

  - You are about to drop the column `img_location` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `img_location`,
    ADD COLUMN `post_img` VARCHAR(191) NULL;
