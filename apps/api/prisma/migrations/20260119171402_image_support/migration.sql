/*
  Warnings:

  - Changed the type of `fileType` on the `FileAsset` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('pdf', 'image');

-- AlterTable
ALTER TABLE "FileAsset" ALTER COLUMN "fileType" TYPE "FileType" USING (
  CASE 
    WHEN "fileType" = 'image' THEN 'image'::"FileType"
    ELSE 'pdf'::"FileType"
  END
);

-- CreateIndex
CREATE INDEX "FileAsset_fileType_idx" ON "FileAsset"("fileType");
