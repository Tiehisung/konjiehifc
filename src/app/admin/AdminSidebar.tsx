"use client";

import { Button } from "@/components/buttons/Button";
import SideDrawerToRight from "@/components/drawer/SideDrawerToRight";
import { ThemeModeToggle } from "@/components/ThemeToggle";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiHome, BiLogOut } from "react-icons/bi";
import { BsChatRightQuote } from "react-icons/bs";
import { CgDatabase } from "react-icons/cg";
import { FcManager } from "react-icons/fc";
import { GiBabyfootPlayers } from "react-icons/gi";
import { LiaDonateSolid, LiaRunningSolid } from "react-icons/lia";
import { MdOutlineFeaturedPlayList, MdOutlineLiveTv } from "react-icons/md";
import { PiNewspaperThin } from "react-icons/pi";

const AdminSidebar = () => {
  return (
    <>
      <LeftPaneDesktop />

      <LeftPaneMobile />
    </>
  );
};

export default AdminSidebar;

export function LeftPaneDesktop() {
  const pathname = usePathname();
  const activeLink = (linkname: string) => {
    if (linkname == "/") return false;
    else return pathname.startsWith(linkname) ? true : false;
  };
  return (
    <div
      className={`max-md:hidden bg-accent w-[220px] max-h-screen overflow-y-auto py-6`}
    >
      <ul className="grid gap-3 h-fit pl-1">
        {sidebarLinks.map((slink, index) => (
          <li key={index}>
            <Link
              href={slink.path}
              className={`px-1 flex items-center gap-2 h-10 text-sm border _borderColor mr-2 _hover ${
                activeLink(slink.path) ? "bg-teal-500/50  " : ""
              }`}
            >
              <span className="text-2xl"> {slink.icon} </span>
              {slink.label}
            </Link>
          </li>
        ))}

        <li className="mt-10 flex gap-4 justify-center items-center">
          <Button
            onClick={() => signOut()}
            primaryText="Logout"
            className={`p-2  _deleteBtn `}
          >
            <BiLogOut />
          </Button>
          <ThemeModeToggle />
        </li>
      </ul>
    </div>
  );
}
export function LeftPaneMobile() {
  const pathname = usePathname();
  const activeLink = (linkname: string) => {
    if (linkname == "/") return false;
    else return pathname.startsWith(linkname) ? true : false;
  };

  return (
    <SideDrawerToRight >
      <ul className="w-full text-teal-500 overflow-y-auto ">
        {sidebarLinks.map((slink, index) => (
          <li
            key={index}
            className={`_hover ${
              activeLink(slink.path) ? " bg-card  " : " "
            }`}
          >
            <Link
              className="px-3 py-2 border-b _borderColor w-full flex gap-2 items-center  "
              href={slink.path}
            >
              <span className="text-xl">{slink.icon}</span>
              {slink.label}
            </Link>
          </li>
        ))}

        <li className="mt-10 flex gap-10 justify-center items-center">
          <Button
            onClick={() => signOut()}
            primaryText="Logout"
            className={`p-2  _deleteBtn rounded-full w-44 justify-center`}
          >
            <BiLogOut />
          </Button>
          <ThemeModeToggle />
        </li>
      </ul>
    </SideDrawerToRight>
  );
}

const sidebarLinks = [
  {
    label: "Home",
    path: "/",
    icon: <BiHome />,
  },
  {
    label: "Features",
    path: "/admin/features",
    icon: <MdOutlineFeaturedPlayList />,
  },
  {
    label: "Matches",
    path: "/admin/matches",
    icon: <CgDatabase />,
  },
  {
    label: "Players",
    path: "/admin/players",
    icon: <GiBabyfootPlayers />,
  },
  {
    label: "Training",
    path: "/admin/training",
    icon: <LiaRunningSolid />,
  },
  {
    label: "Live match",
    path: "/admin/live-match",
    icon: <MdOutlineLiveTv />,
  },

  {
    label: "Managers",
    path: "/admin/managers",
    icon: <FcManager />,
  },
  {
    label: "News",
    path: "/admin/news",
    icon: <PiNewspaperThin />,
  },
  {
    label: "Sponsorship",
    path: "/admin/sponsorship",
    icon: <LiaDonateSolid />,
  },
  {
    label: "Massenger",
    path: "/admin/messages",
    icon: <BsChatRightQuote />,
  },
];
