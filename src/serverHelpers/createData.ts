"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const checkUserExist = async (emailId: string) => {
  const result = await prisma.user.findFirst({
    where: { email: emailId },
  });
  return result;
};

export const createUser = async (user: any) => {
  return await prisma.user.create({
    data: {
      email: user?.email,
      name: user?.name,
      image: user?.image,
    },
  });
};
