/*
  Warnings:

  - Added the required column `location` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `experience` ADD COLUMN `location` VARCHAR(191) NOT NULL;
