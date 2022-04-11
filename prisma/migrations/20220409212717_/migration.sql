/*
  Warnings:

  - You are about to drop the column `description` on the `balance` table. All the data in the column will be lost.
  - The `value` column on the `balance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `price` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "balance" DROP COLUMN "description",
ALTER COLUMN "quantity" SET DEFAULT 1,
ALTER COLUMN "entry" SET DEFAULT false,
DROP COLUMN "value",
ADD COLUMN     "value" MONEY NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "price",
ADD COLUMN     "price" MONEY NOT NULL DEFAULT 0;
