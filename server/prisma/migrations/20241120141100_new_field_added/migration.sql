/*
  Warnings:

  - Added the required column `country` to the `PersonalData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `PersonalData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `personaldata` ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;
