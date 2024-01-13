"use server";

// import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { CodeSnippet } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/authOption";

enum levelType {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

const createCategorySchema = z.object({
  problem_statement: z.string().min(4),
  levelSelected: z.nativeEnum(levelType),
  code: z.string(),
  CategoryID: z.string(),
  codeId: z.string(),
});

interface CreateProgramFormState {
  errors: {
    problem_statement?: string[];
    levelSelected?: string[];
    CategoryID?: string[];
    _form?: string[];
    code?: string[];
    codeId?: string[];
  };
  isSuccess?: boolean;
}

export async function createProgram(
  formState: CreateProgramFormState,
  formData: FormData
): Promise<CreateProgramFormState> {
  const result = createCategorySchema.safeParse({
    problem_statement: formData.get("problem_statement"),
    levelSelected: formData.get("levelSelected"),
    CategoryID: formData.get("categorySelected"),
    code: formData.get("code"),
    codeId: formData.get("codeId"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      isSuccess: false,
    };
  }

  let CodeSnippetData: CodeSnippet;
  try {
    const session: any = await getServerSession(authOptions);
    if (!session || !session.user) {
      return {
        errors: {
          _form: ["You must be signed in to do this."],
        },
      };
    }
    if (result.data.codeId == "ADD") {
      CodeSnippetData = await prisma.codeSnippet.create({
        data: {
          problem_statement: result.data.problem_statement,
          levelSelected: result.data.levelSelected,
          code: result.data.code,
          CategoryID: result.data.CategoryID,
          userID: session.Userid,
        },
      });
    } else {
      CodeSnippetData = await prisma.codeSnippet.update({
        where: {
          id: result.data.codeId,
        },
        data: {
          problem_statement: result.data.problem_statement,
          levelSelected: result.data.levelSelected,
          code: result.data.code,
          CategoryID: result.data.CategoryID,
          userID: session.Userid,
        },
      });
    }
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
