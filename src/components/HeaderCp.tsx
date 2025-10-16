"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHome, BiMailSend, BiTable } from "react-icons/bi";
import { GiSoccerBall } from "react-icons/gi";
import { TbTableRow } from "react-icons/tb";
import { RiFundsFill } from "react-icons/ri";
import { BsStarFill } from "react-icons/bs";
import UserLogButtons from "./UserLogger";
import { GrDashboard } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { FcNews } from "react-icons/fc";
import { ThemeModeToggle } from "./ThemeToggle";
import { SideDrawer } from "./ShadSideDrawer";

export default function HeaderCp() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return;
  return (
    <div
      className={`sticky top-0 flex justify-between items-center border-hidden w-full px-4 z-40 bg-accent/50 backdrop-blur-sm`}
    >
      <div className="_spin">
        <GiSoccerBall size={55} />
      </div>

      <h1 className="flex font-light text-xl md:text-2xl lg:text-3xl ">
        <span className="">Konjiehi</span>{" "}
        <span className="text-yellow-700">FC</span>
      </h1>

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
  const pathname = usePathname();
  return (
    <SideDrawer className="pt-8">
      <ul className="items-center w-full min-h-full text-base cursor-pointer shadow-md">
        {pathname !== "/" && (
          <li className="flex">
            <Link
              href={"/"}
              className="flex gap-1 w-full h-10 items-center hover:text-white hover:bg-blue-400"
            >
              <BiHome className="p-2  " />
              Home
            </Link>
          </li>
        )}

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
          <UserLogButtons logoutStyles="_deleteBtn border rounded flex items-center gap-1 text-sm justify-center w-fit py-1 px-2" />
          <ThemeModeToggle />
        </li>
      </ul>
    </SideDrawer>
  );
}

export const DesktopNav = () => {
  const pathname = usePathname();
  return (
    <ul className="hidden md:flex items-center font-semibold cursor-auto text-sm overflow-x-auto">
      {pathname !== "/" && (
        <li className="border border-border bg-[#e1299e] text-white flex flex-col _p ">
          <Link
            href={"/"}
            className="group flex flex-col grow justify-center items-center pt-1 px-2"
          >
            <span>Home</span>
            <hr className=" w-0 group-hover:w-full h-1 bg-green-500 transition-all duration-300 delay-100" />
          </Link>
        </li>
      )}
      {navLinks.map((lk, index) => (
        <li
          key={index}
          style={{ background: bgcolors[index] }}
          className={`border border-border flex flex-col font-semibold capitalize text-whtie`}
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
  { title: "Players", href: "/players", icon: <BsStarFill /> },
  { title: "Contact us", href: "/contact-us", icon: <BiMailSend /> },
  { title: "Matches", href: "/matches", icon: <BiTable /> },
  { title: "Live", href: "/live-match", icon: <TbTableRow /> },
  { title: "News", href: "/news", icon: <FcNews /> },
];
