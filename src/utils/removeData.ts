"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
var groupBy = require("lodash.groupby");

export const handleRemoveCategory = async (CategoryID: string) => {
  const deleteCategory = await prisma.category.delete({
    where: {
      id: CategoryID,
    },
  });
  revalidatePath("/dsa");
};

export const handleRemoveCode = async (codeSnippetId: string) => {
  const deleteRemoveCode = await prisma.codeSnippet.delete({
    where: {
      id: codeSnippetId,
    },
  });
  revalidatePath("/dsa");
};
