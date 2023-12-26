"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { UserIcon } from "../Logo/Camera.jsx";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Map = [
  {
    pageTitle: "Home Page",
    route: "/",
  },
  {
    pageTitle: "DSA",
    route: "/dsa",
  },
  {
    pageTitle: "Resume Builder",
    route: "/resume-builder",
  },
  {
    pageTitle: "Progress Tracker",
    route: "/progress-tracker",
  },
  {
    pageTitle: "Notes",
    route: "/notes",
  },
];

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="sticky top-0 bottom-0 z-30 flex max-h-screen flex-col min-h-[100vh] border-gold border-2">
      <div className="top-0 overflow-y-auto d-flex flex-column items-center ">
        <div className=" flex flex-col p-2 buttonList">
          {Map.map((ele) => {
            return (
              <Button
                key={ele.route}
                className="mb-2"
                color="warning"
                variant="bordered"
                startContent={<UserIcon />}
                onClick={() => router.push(ele.route)}
              >
                {ele.pageTitle}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
