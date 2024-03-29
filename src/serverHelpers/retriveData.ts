"use server";
import { prisma } from "@/lib/prisma";
var groupBy = require("lodash.groupby");

export const retriveData = async (Userid: string) => {
  const result: any =
    await prisma.$queryRaw`SELECT "public"."CodeSnippet"."id", "public"."CodeSnippet"."problem_statement", "public"."CodeSnippet"."levelSelected"::text, "public"."CodeSnippet"."code", "public"."CodeSnippet"."description", "public"."CodeSnippet"."CategoryID", "public"."CodeSnippet"."createdAt", "public"."CodeSnippet"."updatedAt","public"."Category"."categoryName"
      FROM "public"."CodeSnippet" JOIN "public"."Category" ON "public"."CodeSnippet"."CategoryID" = "public"."Category"."id"
      WHERE "public"."CodeSnippet"."userID" = ${Userid}
      ORDER BY  "public"."CodeSnippet"."updatedAt"`;

  if (result.length > 0) {
    return groupBy(result, "categoryName");
  }
  return [];
};
