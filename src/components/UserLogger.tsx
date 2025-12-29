"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import AdminLoginController from "./auth/Login";
import Loader from "./loaders/Loader";
import { LogoutBtn } from "./auth/Auth";
import { ISession } from "@/types/user";

interface UserLogButtonsProps {
  loginStyles?: string;
 
}

export default function UserLogButtons({ loginStyles }: UserLogButtonsProps) {
  const { data: session, status } = useSession();

  if (status == "loading") return <Loader message="" />;
  if (session)
    return (
      <div className="grid md:flex items-center gap-6 md:gap-2">
        {(session?.user as ISession["user"])?.role?.includes("admin") ? (
          <Link
            href="/admin"
            className="hidden md:block border _borderColor hover:ring rounded px-2 py-1 h-full "
          >
            Admin
          </Link>
        ) : (
          <span> {(session?.user as ISession["user"])?.role ?? "Guest"}</span>
        )}

        <LogoutBtn variant={"destructive"} size={"sm"} />
      </div>
    );
  return <AdminLoginController className={loginStyles} />;
}
