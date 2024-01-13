-- DropForeignKey
ALTER TABLE "CodeSnippet" DROP CONSTRAINT "CodeSnippet_CategoryID_fkey";

-- AddForeignKey
ALTER TABLE "CodeSnippet" ADD CONSTRAINT "CodeSnippet_CategoryID_fkey" FOREIGN KEY ("CategoryID") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
