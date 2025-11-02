"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiMailSend, BiTable } from "react-icons/bi";
import { GiSoccerBall } from "react-icons/gi";
import { TbPlayFootball, TbTableRow } from "react-icons/tb";
import { RiFundsFill, RiNewsLine } from "react-icons/ri";
import UserLogButtons from "./UserLogger";
import { GrDashboard } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { ThemeModeToggle } from "./ThemeToggle";
import { SideDrawer } from "./ShadSideDrawer";

export default function HeaderCp() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return;
  return (
    <div
      className={`sticky top-0 flex justify-between items-center border-hidden w-full px-4 z-40 bg-linear-to-tr from-primaryGreen/25 to-primaryRed/25 backdrop-blur-sm`}
    >
      <Link href={"/"} className="flex items-center">
        <div className="animate-pulse ">
          <GiSoccerBall size={55} />
        </div>

        <h1 className="flex text-2xl md:text-3xl lg:text-4xl ">
          <span className="">Konjiehi</span>{" "}
          <span className="text-yellow-700">FC</span>
        </h1>
      </Link>
      <NavBar />
    </div>
  );
}

export function NavBar() {
  return (
    <div className=" container ml-auto flex justify-end items-center ">
      <DesktopNav />
      <MobilieNavCp />
    </div>
  );
}

export function MobilieNavCp() {
  const { status } = useSession();
 
  return (
    <SideDrawer className="pt-8 " triggerStyles='lg:hidden' side="bottom">
      <ul className="items-center w-full min-h-full text-base cursor-pointer shadow-md space-y-2">
        {navLinks.map((nlink, index) => (
          <li key={index} className="flex">
            <Link
              href={nlink.href}
              className="hover:bg-blue-400 hover:text-white flex gap-1 w-full items-center h-10"
            >
              <span className="p-2 ">{nlink.icon}</span>
              {nlink.title}
            </Link>
          </li>
        ))}
        {status == "authenticated" && (
          <li className={`flex`}>
            <Link
              href={"/admin"}
              className="hover:bg-blue-400 hover:text-white flex gap-1 w-full items-center h-10"
            >
              <span className="p-2 ">{<GrDashboard />}</span>
              Admin Dashboard
            </Link>
          </li>
        )}
        <li className="mt-12 px-3 flex gap-6 items-center flex-wrap">
          <ThemeModeToggle />
          <UserLogButtons logoutStyles="_deleteBtn border rounded flex items-center gap-1 text-sm justify-center w-fit py-1 px-2" />
        </li>
      </ul>
    </SideDrawer>
  );
}

export const DesktopNav = () => {
 
  return (
    <ul className="hidden lg:flex items-center font-semibold cursor-auto text-sm overflow-x-auto">
      {navLinks.map((lk, index) => (
        <li
          key={index}
          style={{ background: bgcolors[index] }}
          className={`border border-border flex flex-col font-semibold capitalize text-white`}
        >
          <Link
            href={lk.href}
            className="group flex flex-col grow justify-center items-center pt-1 px-2"
          >
            <span className="_p whitespace-nowrap">{lk.title}</span>
            <hr className=" w-0 group-hover:w-full h-1 bg-green-500 transition-all duration-300 delay-100" />
          </Link>
        </li>
      ))}

      <li className="ml-3">
        <UserLogButtons logoutStyles="delete__btn border rounded flex items-center gap-1 text-sm justify-center w-fit py-1 px-2" />
      </li>
      <li className="ml-3">
        <ThemeModeToggle />
      </li>
    </ul>
  );
};

const bgcolors = [
  "#901161",
  "#202ae6",
  "#9ab0a3",
  "#4B4B4B",
  "#f44949",
  "#b09a9a",
  "#a8c10a",
  "white",
];
const navLinks = [
  { title: "Sponsors", href: "/sponsorship", icon: <RiFundsFill /> },
  { title: "Players", href: "/players", icon: <TbPlayFootball /> },
  { title: "Contact us", href: "/contact-us", icon: <BiMailSend /> },
  { title: "Matches", href: "/matches", icon: <BiTable /> },
  { title: "Live", href: "/live-match", icon: <TbTableRow /> },
  { title: "News", href: "/news", icon: <RiNewsLine /> },
];
