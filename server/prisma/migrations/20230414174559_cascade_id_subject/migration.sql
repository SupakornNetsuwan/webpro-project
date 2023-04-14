/*
  Warnings:

  - You are about to drop the column `subject_id` on the `Post` table. All the data in the column will be lost.
  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subject_id` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `subject_name` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `FollowPost` DROP FOREIGN KEY `FollowPost_email_fkey`;

-- DropForeignKey
ALTER TABLE `FollowPost` DROP FOREIGN KEY `FollowPost_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `Lesson` DROP FOREIGN KEY `Lesson_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_author_email_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_subject_id_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `subject_id`,
    ADD COLUMN `subject_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Subject` DROP PRIMARY KEY,
    DROP COLUMN `subject_id`,
    ADD PRIMARY KEY (`subject_name`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_subject_name_fkey` FOREIGN KEY (`subject_name`) REFERENCES `Subject`(`subject_name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_author_email_fkey` FOREIGN KEY (`author_email`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FollowPost` ADD CONSTRAINT `FollowPost_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FollowPost` ADD CONSTRAINT `FollowPost_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;
