"use client";

import { signIn, signOut } from "next-auth/react";

import { Button } from "../buttons/Button";
import { LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { TButtonSize, TButtonVariant } from "../ui/button";

interface IProps {
  className?: string;
  variant?: TButtonVariant;
  size?: TButtonSize;
  text?: string;
}

export const LoginBtn = ({
  className,
  size,
  variant,
  text = "Login",
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    await signIn("google", { redirect: true });
    setLoading(false);
  };
  return (
    <Button
      onClick={handleLogin}
      className={className}
      size={size}
      variant={variant ?? "default"}
      waiting={loading}
      primaryText={text}
      waitingText="Logging in"
    >
      <LogIn className="w-4 h-4 mr-2" />
    </Button>
  );
};

export const LogoutBtn = ({
  className,
  size,
  variant,
  text = "Logout",
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    await signOut({ redirectTo: "/" });
    setLoading(false);
  };
  return (
    <Button
      className={className}
      onClick={handleLogout}
      variant={variant ?? "destructive"}
      size={size}
      waiting={loading}
      primaryText={text}
      waitingText="Logging out"
    >
      <LogOut className="w-4 h-4 mr-2" />
    </Button>
  );
};
