"use client";

import Link from "next/link";
import {
  Activity,
  ActivityIcon,
  ClipboardList,
  FileText,
  HeartPulse,
  Home,
  Image,
  LayoutDashboard,
  Newspaper,
  Shield,
  Square,
  Target,
  Tv,
  User,
  UserCheck,
  Users,
  Wallet,
  LetterText,
} from "lucide-react";
import { ILinkItem } from "./GroupedSidebarLinks";
import { PrimaryCollapsible } from "@/components/Collapsible";

export function PrimaryAdminSidebar() {
  return (
    <aside className="w-64 p-4 border-r ">
      {sidebarLinks.map((link) => (
        <SidebarLink key={link.path} item={link} />
      ))}
    </aside>
  );
}

function SidebarLink({ item, depth = 0 }: { item: ILinkItem; depth?: number }) {
  const hasChildren = item.children?.length;

  if (!hasChildren)
    return (
      <div className="flex rounded ">
        <Link
          href={item.path}
          className="flex items-center gap-2 flex-1 pl-2.5 py-1.5 mt-1 _hover text-sm transition-colors "
        >
          {item.icon && item.icon}
          {item.title}
        </Link>
      </div>
    );

  return (
    <PrimaryCollapsible
      header={{
        icon: item.icon,
        path: item.path,
        label: item.title,
        className: "ring-border ",
      }}
      defaultOpen={item.defaultOpen}
    >
      {item.children!.map((child) => (
        <SidebarLink key={child.path} item={child} depth={depth + 1} />
      ))}
    </PrimaryCollapsible>
  );
}

const sidebarLinks: ILinkItem[] = [
  { title: "Home", path: "/", icon: <Home /> },
  { title: "Dashboard", path: "/admin", icon: <LayoutDashboard /> },
  { title: "Docs", path: "/admin/docs", icon: <FileText /> },

  {
    title: "Matches",
    path: "/admin/matches",
    icon: <Target />,
    defaultOpen: true,
    children: [
      {
        title: "Create Fixture",
        path: "/admin/matches/create-fixture",
        icon: <Newspaper />,
      },
      { title: "Live Match", path: "/admin/live-match", icon: <Tv /> },

      {
        title: "Match Request",
        path: "/admin/matches/request",
        icon: <LetterText />,
      },
    ],
  },
  { title: "News", path: "/admin/news", icon: <Newspaper /> },
  {
    title: "Club Media",
    path: "/admin/news",
    icon: <Newspaper />,
    defaultOpen: true,
    children: [
      { title: "News", path: "/admin/news", icon: <Newspaper /> },
      { title: "Gallery", path: "/admin/galleries", icon: <Image /> },
      { title: "Cards", path: "/admin/cards", icon: <Square /> },
      {
        title: "Highlights",
        path: "/admin/matches/highlights",
        icon: <ActivityIcon />,
      },
    ],
  },
  {
    title: "Players",
    path: "/admin/players",
    icon: <User />,
    defaultOpen: true,
    children: [
      { title: "Players", path: "/admin/players", icon: <User /> },
      { title: "Captaincy", path: "/admin/players/captaincy", icon: <User /> },
    ],
  },
  { title: "Teams", path: "/admin/features/teams", icon: <Users /> },
  { title: "Squad", path: "/admin/squad", icon: <Users /> },

  { title: "Managers", path: "/admin/managers", icon: <UserCheck /> },

  {
    title: "Training & Fitness",
    path: "",
    icon: <Activity />,
    defaultOpen: true,
    children: [
      {
        title: "Attendance",
        path: "/admin/training/attendance",
        icon: <ClipboardList />,
      },
      { title: "Injuries", path: "/admin/injuries", icon: <HeartPulse /> },
    ],
  },

  {
    title: "Operations",
    path: "",
    icon: <Wallet />,
    defaultOpen: true,
    children: [
      { title: "Sponsorship", path: "/admin/sponsorship", icon: <Wallet /> },
      { title: "Finance", path: "/admin/resources/finance", icon: <Wallet /> },
      { title: "Users", path: "/admin/users", icon: <Users /> },
      { title: "Logs", path: "/admin/logs", icon: <Shield /> },
    ],
  },
];
