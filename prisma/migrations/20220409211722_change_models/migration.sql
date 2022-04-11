/*
  Warnings:

  - You are about to drop the column `type` on the `balance` table. All the data in the column will be lost.
  - Added the required column `entry` to the `balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "balance" DROP COLUMN "type",
ADD COLUMN     "entry" BOOLEAN NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "price" INTEGER NOT NULL;
