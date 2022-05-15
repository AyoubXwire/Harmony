/*
  Warnings:

  - You are about to alter the column `time` on the `TimeSheet` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the column `updatePassword` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `TimeSheet` MODIFY `time` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `updatePassword`;
