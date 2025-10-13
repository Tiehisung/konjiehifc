"use client";

import { apiConfig } from "@/lib/configs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { GrLogout } from "react-icons/gr";
import React from "react";
import { getErrorMessage } from "@/lib";
import { Button } from "./Button";

type LogoutBtnProps = {
  className?: string;
  setRefreshRate: React.Dispatch<React.SetStateAction<number>>;
};

export default function LogoutBtn({
  className = "secondary__btn text-orange-500 hover:text-orange-300 active:text-orange-700",
  setRefreshRate,
}: LogoutBtnProps) {
  const [waiting, setWaiting] = useState(false);
  const router = useRouter();
  const onLogout = async () => {
    try {
      setWaiting(true);
      const response = await axios(apiConfig.logout);
      const data = response.data;

      toast(data.message, { type: data.success ? "success" : "error" });
      if (response.data.success) router.replace("/");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      router.refresh();
      setRefreshRate((prev) => prev + 1);
      setTimeout(() => {
        setWaiting(false);
      }, 4000);
    }
  };
  return (
    <div className={`w-full`}>
      <Button
        primaryText={"Logout"}
        handleClickEvent={onLogout}
        waiting={waiting}
        waitingText={"Logging out"}
        disabled={waiting}
        className={`remove__btn ${className} text-sm flex items-center gap-2 w-full px-1`}
      >
        <GrLogout />
      </Button>
    </div>
  );
}
