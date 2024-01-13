import GithubProvider from "next-auth/providers/github";
import { checkUserExist, createUser } from "@/serverHelpers/createData"; //import { createUser } from "@/serverHelpers/createData";
import { prisma } from "@/lib/prisma";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const result: any = await prisma.user.findFirst({
        where: {
          email: session?.user?.email,
        },
      });
      return { ...session, Userid: result?.Userid };
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      if (user) {
        const result = await checkUserExist(user?.email);
        if (!result) {
          await createUser(user);
          return true;
        } else {
          return true;
        }
      }
      return true;
    },
  },
};
