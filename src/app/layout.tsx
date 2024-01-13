import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/app/providers";
import Header from "@/components/header";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Built By Developer for developers",
  description:
    "Data Strcture & Algorith, Resume Builder, Course Tracker, Notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="w-full">
            <Header />
            <div className="flex flex-row bg-dark">
              <div className="w-[225px]">
                <Sidebar />
              </div>
              <div className="flex-1">
                <div className="h-[200vh]">{children}</div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
