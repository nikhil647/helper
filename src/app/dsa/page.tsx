"use server";
import { prisma } from "@/lib/prisma";
import DsaPage from "@/components/dsaPage/page";
import { Category } from "@prisma/client";
async function dsa() {
  const category: Category[] = await prisma.category.findMany({
    where: {},
  });

  return (
    <div>
      <DsaPage Category={category} />
    </div>
  );
}

export default dsa;
