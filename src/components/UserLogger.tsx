"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "./buttons/Button";
import Link from "next/link";
import AdminLoginController from "./auth/Login";
import Loader from "./loaders/Loader";
import { BiLogOutCircle } from "react-icons/bi";
import { LoginBtn, LogoutBtn } from "./auth/Auth";
import { ISession } from "@/types/user";

interface UserLogButtonsProps {
  loginStyles?: string;
  logoutStyles?: string;
}

export default function UserLogButtons({ loginStyles }: UserLogButtonsProps) {
  const { data: session  , status } = useSession();


  if (status == "loading") return <Loader message="" />;
  if (session)
    return (
      <div className="grid md:flex items-center gap-6 md:gap-2">
        {(session?.user as ISession['user'])?.role?.includes("admin") ? (
          <Link
            href="/admin"
            className="hidden md:block border _borderColor hover:ring rounded px-2 py-1 h-full "
          >
            Admin
          </Link>
        ) : (
          <span> {(session?.user as ISession['user'])?.role ?? "Guest"}</span>
        )}

        {/* <Button
          disabled={isDisabled}
          onClick={handleLogout}
          primaryText=""
          className={`px-2 py-1 flex items-center gap-2 ${logoutStyles}`}
          title="Logout"
        >
          <BiLogOutCircle size={20} /> <span className="md:hidden">Logout</span>
        </Button> */}

        <LogoutBtn />
      </div>
    );
  return <AdminLoginController className={loginStyles} />;
}
