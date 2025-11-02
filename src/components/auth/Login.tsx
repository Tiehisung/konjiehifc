"use client";

import React, { useState } from "react";
import { IconInputWithLabel } from "../input/Inputs";
import { Button } from "../buttons/Button";
import { signIn } from "next-auth/react";
import { getErrorMessage } from "@/lib";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { RiLoginBoxLine } from "react-icons/ri";
import { DIALOG } from "../Dialog";

const AdminLoginController = ({ className }: { className?: string }) => {
  const [waiting, setWaiting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      setWaiting(true);
      const result = await signIn("credentials", {
        redirect: true,
        callbackUrl: "/admin",
        email: email,
        password: password,
      });

      if (result?.error) {
        toast.error("Error signing in: " + result.error);
      } else {
        toast.info("Successfully signed in");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
    }
  };
  return (
    <>
      <DIALOG
        trigger={"Login"}
        triggerStyles={`_secondaryBtn justify-center px-2 py-1 h-full ${className}`}
        title={undefined}
      >
        <div className="bg-white grid gap-8 border p-5 rounded-2xl container shadow-xl">
          <IconInputWithLabel
            label="Email"
            labelStyles="text-gray-700"
            wrapperStyles="mt-6"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <IconInputWithLabel
            labelStyles="text-gray-700"
            label="Password"
            name="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            primaryText="Sign in with credentials"
            waiting={waiting}
            waitingText="Signing in..."
            onClick={handleSignIn}
            className="_primaryBtn p-2 grow w-full justify-center"
          >
            <RiLoginBoxLine />
          </Button>
          <div className="flex items-center text-teal-900 text-xl">
            <hr className="border-gray-400 grow" />
            or
            <hr className="border-gray-400 grow" />
          </div>
          <button
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className="shadow border rounded p-2 bg-blue-400 px-4 py-2 w-full flex items-center gap-2"
          >
            <FcGoogle size={24} /> Sign In with Google
          </button>
        </div>
      </DIALOG>
    </>
  );
};

export default AdminLoginController;
