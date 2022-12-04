-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NOT NULL,
    `surename` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `fathersname` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `birthday` VARCHAR(191) NULL,
    `timeLeft` INTEGER NULL DEFAULT 0,
    `password` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL DEFAULT 'defaulAvatar.png',
    `role` ENUM('USER', 'ADMIN', 'ROOT') NOT NULL DEFAULT 'USER',
    `refresh_token` VARCHAR(500) NULL,
    `positionId` INTEGER NULL,

    UNIQUE INDEX `users_phone_key`(`phone`),
    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    INDEX `users_positionId_fkey`(`positionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vin` VARCHAR(191) NULL,
    `model` VARCHAR(191) NOT NULL,
    `fuel` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `passport_car` VARCHAR(191) NULL,
    `oddometr` INTEGER NULL,
    `insurance` VARCHAR(191) NULL,
    `timeLeft` INTEGER NULL DEFAULT 0,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Car_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `adress` VARCHAR(191) NULL,
    `coordinate` VARCHAR(191) NULL,
    `service_contract` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_person` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `surename` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `fathersname` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `position` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `firmId` INTEGER NULL,

    UNIQUE INDEX `Contact_person_phone_key`(`phone`),
    UNIQUE INDEX `Contact_person_email_key`(`email`),
    INDEX `Contact_person_firmId_fkey`(`firmId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fire_extinguishers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reminding` BOOLEAN NOT NULL DEFAULT true,
    `model` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `next_check` VARCHAR(191) NOT NULL,
    `timeLeft` INTEGER NULL DEFAULT 0,
    `firmId` INTEGER NULL,

    INDEX `Fire_extinguishers_firmId_fkey`(`firmId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fire_hydrant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reminding` BOOLEAN NOT NULL DEFAULT true,
    `quantity` INTEGER NOT NULL,
    `next_check` VARCHAR(191) NOT NULL,
    `timeLeft` INTEGER NULL DEFAULT 0,
    `firmId` INTEGER NULL,

    UNIQUE INDEX `Fire_hydrant_firmId_fkey`(`firmId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fire_resistant_impregnation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reminding` BOOLEAN NOT NULL DEFAULT true,
    `seepage_liquid` VARCHAR(191) NOT NULL,
    `area` INTEGER NOT NULL,
    `next_check` VARCHAR(191) NOT NULL,
    `timeLeft` INTEGER NULL DEFAULT 0,
    `firmId` INTEGER NULL,

    UNIQUE INDEX `Fire_resistant_impregnation_firmId_key`(`firmId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fuel_card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `pin` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `station_brend` VARCHAR(191) NOT NULL DEFAULT 'OKKO',
    `userId` INTEGER NULL,

    INDEX `Fuel_card_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Observation` (
    `observation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `contract` VARCHAR(191) NULL,
    `sim_card` INTEGER NOT NULL,
    `firmId` INTEGER NULL,

    UNIQUE INDEX `Observation_observation_id_key`(`observation_id`),
    UNIQUE INDEX `Observation_sim_card_key`(`sim_card`),
    UNIQUE INDEX `Observation_firmId_key`(`firmId`),
    PRIMARY KEY (`observation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sim_card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `operator` VARCHAR(191) NOT NULL DEFAULT 'kyivstar',
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Sim_card_number_key`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `Position`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `car` ADD CONSTRAINT `Car_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contact_person` ADD CONSTRAINT `Contact_person_firmId_fkey` FOREIGN KEY (`firmId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fire_extinguishers` ADD CONSTRAINT `Fire_extinguishers_firmId_fkey` FOREIGN KEY (`firmId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fire_hydrant` ADD CONSTRAINT `Fire_hydrant_firmId_fkey` FOREIGN KEY (`firmId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fire_resistant_impregnation` ADD CONSTRAINT `Fire_resistant_impregnation_firmId_fkey` FOREIGN KEY (`firmId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fuel_card` ADD CONSTRAINT `Fuel_card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observation` ADD CONSTRAINT `Observation_sim_card_fkey` FOREIGN KEY (`sim_card`) REFERENCES `Sim_card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Observation` ADD CONSTRAINT `Observation_firmId_key` FOREIGN KEY (`firmId`) REFERENCES `client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
