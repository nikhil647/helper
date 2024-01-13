"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function LoginButton() {
  const session = useSession();
  if (session?.status === "loading") {
    return (
      <button
        onClick={() => signOut()}
        className=" bg-slate-800 text-white px-6 py-3 rounded-lg"
      >
        Loading...
      </button>
    );
  }
  if (session?.status === "authenticated") {
    return (
      <button
        onClick={() => signOut()}
        className=" bg-slate-800 text-white px-6 py-3 rounded-lg"
      >
        Sign Out
      </button>
    );
  }
  return (
    <button
      onClick={() => signIn("github")}
      className="bg-slate-800 text-white px-6 py-3 rounded-lg"
    >
      Sign in with Github
    </button>
  );
}
