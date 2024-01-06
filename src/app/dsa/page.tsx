"use server";
import { prisma } from "@/lib/prisma";
import DsaPage from "@/components/dsaPage/page";
import { Category } from "@prisma/client";
import { retriveData } from "@/utils/retriveData";

async function dsa() {
  const category: Category[] = await prisma.category.findMany({
    where: {},
  });

  const listOfPrograms = await retriveData();

  return (
    <div>
      <DsaPage Category={category} listOfPrograms={listOfPrograms} />
    </div>
  );
}

export default dsa;
