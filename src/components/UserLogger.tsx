"use client";

import { signOut, useSession } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { Button } from "./buttons/Button";
import Link from "next/link";
import AdminLoginController from "./auth/Login";
import Loader from "./loaders/Loader";

interface UserLogButtonsProps {
  loginStyles?: string;
  logoutStyles?: string;
}

export default function UserLogButtons({
  logoutStyles,
  loginStyles,
}: UserLogButtonsProps) {
  const { data: session, status } = useSession();
  const isDisabled = status === "loading" ? true : false;

  function handleLogout() {
    signOut();
    // router.replace(`${apiConfig.signout}?callbackUrl=/`);
  }
  if (status == "loading") return <Loader message="" />;
  if (session)
    return (
      <div className="grid md:flex items-center gap-6 md:gap-2">
        <Link
          href="/admin"
          className="hidden md:block border _borderColor hover:ring rounded px-2 py-1 h-full "
        >
          Admin
        </Link>

        <Button
          disabled={isDisabled}
          onClick={handleLogout}
          primaryText=""
          className={`px-2 py-1 flex items-center gap-2 ${logoutStyles}`}
          title="Logout"
        >
          <BiLogOut size={20} /> <span className="md:hidden">Logout</span>
        </Button>
      </div>
    );
  return <AdminLoginController className={loginStyles} />;
}
