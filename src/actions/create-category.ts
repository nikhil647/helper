"use server";

import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";

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
}

export async function createCategory(
  formState: CreateCategoryFormState,
  formData: FormData
): Promise<CreateCategoryFormState> {
  const result = createCategorySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  //   const session = await auth();
  //   if (!session || !session.user) {
  //     return {
  //       errors: {
  //         _form: ["You must be signed in to do this."],
  //       },
  //     };
  //   }
  console.log("Into the server action");
  return new Promise((resolve) => {
    name: "login";
  });

  //   let topic: Topic;
  //   try {
  //     topic = await db.topic.create({
  //       data: {
  //         slug: result.data.name,
  //         description: result.data.description,
  //       },
  //     });
  //   } catch (err: unknown) {
  //     if (err instanceof Error) {
  //       return {
  //         errors: {
  //           _form: [err.message],
  //         },
  //       };
  //     } else {
  //       return {
  //         errors: {
  //           _form: ["Something went wrong"],
  //         },
  //       };
  //     }
  //   }

  //   revalidatePath("/");
  //   redirect(paths.topicShow(topic.slug));
}
