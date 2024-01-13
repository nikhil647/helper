/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `userID` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `CodeSnippet` table without a default value. This is not possible if the table is not empty.
  - The required column `Userid` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "userID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CodeSnippet" ADD COLUMN     "userID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "Userid" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("Userid");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("Userid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeSnippet" ADD CONSTRAINT "CodeSnippet_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("Userid") ON DELETE CASCADE ON UPDATE CASCADE;
