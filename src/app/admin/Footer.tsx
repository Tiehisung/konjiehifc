"use client";
import Link from "next/link";
import React from "react";

const AdminFooter = () => {
  return (
    <div className="min-h-60 bg-teal-900 text-white grid items-start justify-center gap-6 p-6 mt-10 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
      {links.map((link, i) => (
        <Link
          href={link.path}
          key={i}
          className="hover:bg-background/35 rounded px-2 py-1 text-center h-fit slowTrans hover:text-blue-600 "
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default AdminFooter;

const links = [
  { label: "About", path: "/about" },
  { label: "Home", path: "/" },
  { label: "Logout", path: "/api/auth/signout?callbackUrl=/" },
  { label: "Signing", path: "/admin/player-signing" },
  { label: "Settings", path: "/admin/settings" },
  { label: "Authorization", path: "/admin/authorization" },
  { label: "Messenger", path: "/admin/messenger" },
  { label: "Terms & Privacy", path: "/terms-and-privacy" },
];
