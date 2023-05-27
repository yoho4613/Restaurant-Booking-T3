/*
  Warnings:

  - Added the required column `tableId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('staff', 'manager', 'admin', 'superadmin');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "canceled" BOOL NOT NULL DEFAULT false;
ALTER TABLE "Booking" ADD COLUMN     "tableId" STRING NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" STRING NOT NULL,
    "name" STRING(255) NOT NULL,
    "email" STRING NOT NULL,
    "verified" BOOL DEFAULT false,
    "password" STRING NOT NULL,
    "role" "RoleEnumType" DEFAULT 'staff',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "provider" STRING,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tables" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "location" STRING NOT NULL,
    "capacity" INT4 NOT NULL,

    CONSTRAINT "Tables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
