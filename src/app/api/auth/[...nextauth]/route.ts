import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import { checkUserExist, createUser } from "@/serverHelpers/createData"; //import { createUser } from "@/serverHelpers/createData";
import { prisma } from "@/lib/prisma";

const handler: any = NextAuth({
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
      return { ...session, Userid: result.Userid };
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      if (user) {
        const result = await checkUserExist(user?.email);
        if (!result) {
          const newUser = await createUser(user);
          return newUser;
        } else {
          return result;
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
