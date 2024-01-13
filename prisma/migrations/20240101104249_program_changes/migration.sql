/*
  Warnings:

  - Added the required column `levelSelected` to the `CodeSnippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problem_statement` to the `CodeSnippet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "level" AS ENUM ('Easy', 'Medium', 'Hard');

-- AlterTable
ALTER TABLE "CodeSnippet" ADD COLUMN     "levelSelected" "level" NOT NULL,
ADD COLUMN     "problem_statement" TEXT NOT NULL;
