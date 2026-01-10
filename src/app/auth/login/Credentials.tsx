"use client";

import { Button } from "@/components/buttons/Button";
import { IconInputWithLabel } from "@/components/input/Inputs";
import { getErrorMessage } from "@/lib";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export const CredentialsLoginForm = ({ className }: { className?: string }) => {
  const [waiting, setWaiting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({ username: "", password: "", general: "" });

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setWaiting(true);
      if (!username || !password) {
        if (!username)
          setError((prev) => ({ ...prev, username: "Username is required" }));
        if (!password)
          setError((prev) => ({ ...prev, password: "Password is required" }));

        return;
      }
      await signIn("credentials", {
        redirect: true,
        callbackUrl: "/admin",
        username,
        password,
      });
    } catch (err) {
      console.log("SignIn error:", err);
      toast.error(getErrorMessage(err));
    } finally {
      setWaiting(false);
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
      className={`${className} flex flex-col gap-8 pb-8 p-5 min-w-2xs grow`}
    >
      <IconInputWithLabel
        label="Username"
        labelStyles="text-gray-700"
        wrapperStyles="mt-6"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        //   required
        error={error.username}
      />
      <IconInputWithLabel
        labelStyles="text-gray-700"
        label="Password"
        name="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        error={error.password}
        //   required
      />
      <Button
        primaryText="Sign in with credentials"
        waiting={waiting}
        waitingText="Signing in..."
        type="submit"
        className=" _primaryBtn p-2 grow w-full justify-center"
        variant="secondary"
      >
        <LogIn className="w-4 h-4 " />
      </Button>
    </form>
  );
};
