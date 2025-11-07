"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiTable } from "react-icons/bi";
import { GiSoccerBall } from "react-icons/gi";
import { TbPlayFootball, TbTableRow } from "react-icons/tb";
import { RiNewsLine } from "react-icons/ri";
import { SiGithubsponsors } from "react-icons/si";
import UserLogButtons from "./UserLogger";
import { GrDashboard } from "react-icons/gr";
import { useSession } from "next-auth/react";
import { ThemeModeToggle } from "./ThemeToggle";
import { NavigationPopover } from "./NavigationPopover";

export default function HeaderCp() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return;
  return (
    <div
      className={`sticky top-1 flex gap-6 justify-between items-center w-fit p-1.5 z-40 bg-linear-to-tr from-primary/25 to-background/25 backdrop-blur-sm rounded-full border shadow`}
    >
      <Link href={"/"} className="flex items-center">
        <div className="animate-pulse ">
          <GiSoccerBall size={44} />
        </div>

        <h1 className="flex text-2xl md:text-3xl lg:text-4xl font-semibold ">
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
      <MobilePublicNuv />
    </div>
  );
}



export const DesktopNav = () => {
  return (
    <ul className="hidden lg:flex items-center font-semibold cursor-auto text-sm overflow-x-auto">
      {navLinks.map((lk, index) => (
        <li
          key={index}
          style={{ background: bgcolors[index] }}
          className={` flex flex-col font-semibold capitalize text-white overflow-hidden ${
            index == 0
              ? "rounded-l-full"
              : index == navLinks.length - 1
              ? "rounded-r-full"
              : ""
          }`}
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
  {
    title: "Sponsors",
    href: "/sponsorship",
    icon: <SiGithubsponsors size={24} />,
  },
  { title: "Players", href: "/players", icon: <TbPlayFootball size={24} /> },
  { title: "Matches", href: "/matches", icon: <BiTable size={24} /> },
  { title: "Live", href: "/live-match", icon: <TbTableRow size={24} /> },
  { title: "News", href: "/news", icon: <RiNewsLine size={24} /> },
];

export const MobilePublicNuv = () => {
  const { status } = useSession();
  return (
    <NavigationPopover>
      <ul className="items-center w-full space-y-2">
        {navLinks.map((nlink, index) => (
          <li key={index} className="flex _hover">
            <Link
              href={nlink.href}
              className="flex gap-1 w-full items-center h-10 hover:font-black px-2"
            >
              <span className="p-2 ">{nlink.icon}</span>
              {nlink.title}
            </Link>
          </li>
        ))}
        {status == "authenticated" && (
          <li className={`flex _hover`}>
            <Link
              href={"/admin"}
              className="flex gap-1 w-full items-center h-10 hover:font-semibold px-2"
            >
              <span className="p-2 ">{<GrDashboard size={24} />}</span>
              Admin Dashboard
            </Link>
          </li>
        )}
        <li className="mt-12 px-3 flex gap-6 items-center flex-wrap">
          <ThemeModeToggle />
          <UserLogButtons logoutStyles="_deleteBtn border rounded flex items-center gap-1 text-sm justify-center w-fit py-1 px-2" />
        </li>
      </ul>
    </NavigationPopover>
  );
};

// export function MobilieNavCp() {
//   const { status } = useSession();

//   return (
//     <SideDrawer
//       className="pt-8 "
//       triggerStyles="lg:hidden rounded-full aspect-square h-12 shadow-lg"
//       side="bottom"
//     >
//       <ul className="items-center w-full min-h-full text-base cursor-pointer shadow-md space-y-2">
//         {navLinks.map((nlink, index) => (
//           <li key={index} className="flex">
//             <Link
//               href={nlink.href}
//               className="hover:bg-blue-400 hover:text-white flex gap-1 w-full items-center h-10"
//             >
//               <span className="p-2 ">{nlink.icon}</span>
//               {nlink.title}
//             </Link>
//           </li>
//         ))}
//         {status == "authenticated" && (
//           <li className={`flex`}>
//             <Link
//               href={"/admin"}
//               className="hover:bg-blue-400 hover:text-white flex gap-1 w-full items-center h-10"
//             >
//               <span className="p-2 ">{<GrDashboard size={24} />}</span>
//               Admin Dashboard
//             </Link>
//           </li>
//         )}
//         <li className="mt-12 px-3 flex gap-6 items-center flex-wrap">
//           <ThemeModeToggle />
//           <UserLogButtons logoutStyles="_deleteBtn border rounded flex items-center gap-1 text-sm justify-center w-fit py-1 px-2" />
//         </li>
//       </ul>
//     </SideDrawer>
//   );
// }