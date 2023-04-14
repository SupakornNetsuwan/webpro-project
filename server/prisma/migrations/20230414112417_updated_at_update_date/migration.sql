/*
  Warnings:

  - The primary key for the `Lesson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Post` table. All the data in the column will be lost.
  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `author_email` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_date` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Lesson` DROP FOREIGN KEY `Lesson_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_email_fkey`;

-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_subject_id_fkey`;

-- AlterTable
ALTER TABLE `Lesson` DROP PRIMARY KEY,
    MODIFY `lesson_id` VARCHAR(191) NOT NULL,
    MODIFY `lesson_content` LONGTEXT NOT NULL,
    MODIFY `file_location` VARCHAR(191) NULL,
    MODIFY `img_location` VARCHAR(191) NULL,
    MODIFY `post_id` VARCHAR(191) NOT NULL,
    ALTER COLUMN `updated_date` DROP DEFAULT,
    ADD PRIMARY KEY (`lesson_id`);

-- AlterTable
ALTER TABLE `Post` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    ADD COLUMN `author_email` VARCHAR(191) NOT NULL,
    ADD COLUMN `img_location` VARCHAR(191) NULL,
    ADD COLUMN `updated_date` DATETIME(3) NOT NULL,
    MODIFY `post_id` VARCHAR(191) NOT NULL,
    MODIFY `intro` MEDIUMTEXT NOT NULL,
    MODIFY `subject_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`post_id`);

-- AlterTable
ALTER TABLE `Subject` DROP PRIMARY KEY,
    MODIFY `subject_id` VARCHAR(191) NOT NULL,
    MODIFY `description` MEDIUMTEXT NOT NULL,
    ADD PRIMARY KEY (`subject_id`);

-- CreateTable
CREATE TABLE `FollowPost` (
    `email` VARCHAR(191) NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`email`, `post_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_author_email_fkey` FOREIGN KEY (`author_email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lesson` ADD CONSTRAINT `Lesson_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`post_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FollowPost` ADD CONSTRAINT `FollowPost_email_fkey` FOREIGN KEY (`email`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FollowPost` ADD CONSTRAINT `FollowPost_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`post_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
