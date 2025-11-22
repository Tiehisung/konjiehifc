"use client";

import { Button } from "@/components/buttons/Button";
import { NavigationPopover } from "@/components/NavigationPopover";
import { ThemeModeToggle } from "@/components/ThemeToggle";
import UserLogButtons from "@/components/UserLogger";
import { LogOut, Logs } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { CgDatabase } from "react-icons/cg";
import { FcDocument, FcManager } from "react-icons/fc";
import { FiUserCheck } from "react-icons/fi";
import { GiBabyfootPlayers } from "react-icons/gi";
import { GrDashboard, GrGallery } from "react-icons/gr";
import { LiaDonateSolid, LiaRunningSolid } from "react-icons/lia";
import { MdOutlineFeaturedPlayList, MdOutlineLiveTv } from "react-icons/md";
import { PiNewspaperThin } from "react-icons/pi";
import { RiHomeLine } from "react-icons/ri";

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
    else return pathname == linkname ? true : false;
  };
  return (
    <div
      className={`max-md:hidden bg-accent w-[220px] max-h-screen overflow-y-auto py-6`}
    >
      <div className="p-6 flex items-center justify-between">
        <Link
          href={"/"}
          className="text-2xl font-semibold grow flex"
          title="Home"
        >
          ⚽ KonFC
        </Link>
      </div>
      <ul className="flex flex-col flex-1 gap-3 h-fit pl-1">
        {sidebarLinks.map((slink, index) => (
          <li key={index}>
            <Link
              href={slink.path}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-secondary-foreground/10 transition-colors text-left ${
                activeLink(slink.path) ? "bg-teal-500/50  " : ""
              }`}
            >
              <span className="text-2xl"> {slink.icon} </span>
              {slink.label}
            </Link>
          </li>
        ))}

        <li className="mt-10 flex gap-4 justify-center items-center"></li>
      </ul>

      <footer className="flex items-center gap-3.5 justify-betweenp-4 border-t border-secondary-foreground/20">
        <ThemeModeToggle />

        <Button
          onClick={() => signOut()}
          primaryText="Logout"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary-foreground/10 transition-colors"
        >
          <LogOut size={20} />
        </Button>
      </footer>
    </div>
  );
}

export function LeftPaneMobile() {
  const pathname = usePathname();
  const activeLink = (linkname: string) =>
    pathname == linkname ? true : false;

  const mobileLinks = [
    {
      label: "Home",
      path: "/",
      icon: <RiHomeLine />,
    },
    ...sidebarLinks,
  ];

  return (
    <NavigationPopover
      align="start"
      triggerStyles="md:hidden"
      className="backdrop-blur-sm text-white"
    >
      <ul className="w-full">
        {mobileLinks.map((slink, index) => (
          <li
            key={index}
            className={`flex _hover _shrink px-2 rounded-md ${
              activeLink(slink.path) ? " text-primary bg-popover/70 " : " "
            }`}
          >
            <Link
              className="flex gap-1 w-full items-center h-10 text-sm font-light "
              href={slink.path}
            >
              <span className="text-xl bg-accent/30 rounded-full p-1.5">
                {slink.icon}
              </span>
              {slink.label}
            </Link>
          </li>
        ))}

        <li className="mt-12 px-3 flex gap-6 items-center">
          <ThemeModeToggle className="w-full" />
          <UserLogButtons logoutStyles="bg-popover border rounded flex items-center gap-1 text-sm justify-center w-full _secondaryBtn _hover py-1 px-2" />
        </li>
      </ul>
    </NavigationPopover>
  );
}
const sidebarLinks = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: <GrDashboard />,
  },
  {
    label: "Docs",
    path: "/admin/docs",
    icon: <FcDocument />,
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
    label: "Live match",
    path: "/admin/live-match",
    icon: <MdOutlineLiveTv />,
  },
  {
    label: "Teams",
    path: "/admin/features/teams",
    icon: <AiOutlineTeam />,
  },
  {
    label: "Squad",
    path: "/admin/squad",
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
    label: "Finance",
    path: "/admin/resources/finance",
    icon: <LiaDonateSolid />,
  },
  {
    label: "Gallery",
    path: "/admin/galleries",
    icon: <GrGallery />,
  },
  {
    label: "Attendance",
    path: "/admin/training/attendance",
    icon: <FiUserCheck />,
  },
  {
    label: "Logs",
    path: "/admin/logs",
    icon: <Logs />,
  },
];
