"use client";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
//import { DisplayComponentContext } from "./ContextApi/DisplayContext";

interface ProvidersProps {
  children: React.ReactNode;
}
export default function Providers({ children }: ProvidersProps) {
  const [displayComponent, setDisplayComponent] = useState("");

  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
