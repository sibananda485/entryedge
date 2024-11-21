/*
  Warnings:

  - Added the required column `isPursuing` to the `Education` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `education` ADD COLUMN `isPursuing` BOOLEAN NOT NULL;
