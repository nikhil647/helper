"use server";

// import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// import { db } from "@/db";
// import paths from "@/paths";
import { prisma } from "@/lib/prisma";
import type { Category } from "@prisma/client";

const createCategorySchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z\s]*$/g, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string(),
});

interface CreateCategoryFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
  isSuccess?: boolean;
}

export async function createCategory(
  formState: CreateCategoryFormState,
  formData: FormData
): Promise<CreateCategoryFormState> {
  // Validation
  const result = createCategorySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      isSuccess: false,
    };
  }
  // Authentication & Authorization Check
  // const session = await getServerSession(authOptions);
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this."],
      },
    };
  }
  // await prisma.category.deleteMany({
  //   where: {},
  // });
  let category: Category;
  try {
    category = await prisma.category.create({
      data: {
        categoryName: result.data.name,
        description: result.data.description,
        userID: session.Userid,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create post"],
        },
      };
    }
  }

  revalidatePath("/dsa");
  return {
    errors: {},
    isSuccess: true,
  };
}
