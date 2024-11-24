-- CreateTable
CREATE TABLE `Job` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `salaryMin` VARCHAR(191) NOT NULL,
    `salaryMax` VARCHAR(191) NOT NULL,
    `employmentType` VARCHAR(191) NOT NULL,
    `workHour` VARCHAR(191) NOT NULL,
    `education` VARCHAR(191) NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `skills` VARCHAR(191) NOT NULL,
    `jd` VARCHAR(191) NOT NULL,
    `qualification` VARCHAR(191) NOT NULL,
    `responsibilities` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `companyId` INTEGER NOT NULL,
    `personalDataId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_personalDataId_fkey` FOREIGN KEY (`personalDataId`) REFERENCES `PersonalData`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
