"use server";
import { prisma } from "@/lib/prisma";
import DsaPage from "@/components/dsaPage/page";
import { Category } from "@prisma/client";
import { retriveData } from "@/serverHelpers/retriveData";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function dsa() {
  const session = await getServerSession(authOptions);
  let category,
    listOfPrograms = [];
  if (session && session?.Userid) {
    category = await prisma.category.findMany({
      where: {
        userID: session.Userid,
      },
    });
    listOfPrograms = await retriveData(session.Userid);
  }
  return (
    <div>
      <DsaPage Category={category} listOfPrograms={listOfPrograms} />
    </div>
  );
}

export default dsa;
