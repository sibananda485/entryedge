/*
  Warnings:

  - You are about to drop the column `personalDataId` on the `job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `job` DROP FOREIGN KEY `Job_personalDataId_fkey`;

-- AlterTable
ALTER TABLE `job` DROP COLUMN `personalDataId`;

-- CreateTable
CREATE TABLE `_JobToPersonalData` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_JobToPersonalData_AB_unique`(`A`, `B`),
    INDEX `_JobToPersonalData_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_JobToPersonalData` ADD CONSTRAINT `_JobToPersonalData_A_fkey` FOREIGN KEY (`A`) REFERENCES `Job`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_JobToPersonalData` ADD CONSTRAINT `_JobToPersonalData_B_fkey` FOREIGN KEY (`B`) REFERENCES `PersonalData`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
