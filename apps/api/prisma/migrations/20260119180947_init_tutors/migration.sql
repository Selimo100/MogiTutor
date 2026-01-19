/*
  Warnings:

  - You are about to drop the column `module` on the `Competency` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[moduleId,code]` on the table `Competency` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `moduleId` to the `Competency` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Competency_module_code_key";

-- DropIndex
DROP INDEX "Competency_module_idx";

-- AlterTable
ALTER TABLE "Competency" DROP COLUMN "module",
ADD COLUMN     "moduleId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Tutor" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tutor_slug_key" ON "Tutor"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Module_tutorId_code_key" ON "Module"("tutorId", "code");

-- CreateIndex
CREATE INDEX "Competency_moduleId_idx" ON "Competency"("moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "Competency_moduleId_code_key" ON "Competency"("moduleId", "code");

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Competency" ADD CONSTRAINT "Competency_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
