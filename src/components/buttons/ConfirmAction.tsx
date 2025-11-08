"use client";

import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";
import { Card, CardContent } from "@/components/ui/card";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { toast } from "sonner";
import { fireEscape } from "@/hooks/Esc";
import { useSession } from "next-auth/react";
import { IUser } from "@/types/user";

interface IProps {
  className?: string;
  variant?: "outline" | "destructive" | "secondary" | "primary";
  primaryText: string;
  loadingText?: string;
  children?: ReactNode;
  uri?: string;
  method: "PUT" | "POST" | "DELETE" | "GET";
  body?: unknown;
  escapeOnEnd?: boolean;
  title?: string;
  confirmText?: string;
  gobackAfter?: boolean;
  triggerStyles?: string;
  hidden?: boolean;
}

export const ConfirmActionButton = ({
  variant = "primary",
  className,
  method = "GET",
  body,
  children,
  loadingText,
  uri,
  primaryText,
  escapeOnEnd = false,
  confirmText,
  title,
  gobackAfter,
  triggerStyles = variant == "primary"
    ? "text-primaryGreen"
    : variant == "secondary"
    ? "text-primary"
    : variant == "destructive"
    ? "text-red-500"
    : "",
  hidden = true,
}: IProps) => {
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);

  const session = useSession();
  const isAdmin = (session?.data?.user as IUser)?.role?.includes("admin");

  const triggerClassName =
    triggerStyles ??
    (variant == "primary"
      ? "text-primaryGreen"
      : variant == "secondary"
      ? "text-primary"
      : variant == "destructive"
      ? "text-red-500"
      : "");

  const handleAction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setWaiting(true);
      const response = await fetch(
        uri?.startsWith(apiConfig.base)
          ? uri
          : uri?.startsWith("/")
          ? `${apiConfig.base}${uri}`
          : `${apiConfig.base}/${uri}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          cache: "no-cache",
          body: JSON.stringify(body),
        }
      );
      const results = await response.json();
      if (results.success) toast.success(results.message);
      if (!results.success) toast.error(results.message);

      if (gobackAfter) router.back();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
      router.refresh();
      setTimeout(() => {
        router.refresh();
      }, 1000);
      if (escapeOnEnd) fireEscape();
    }
  };

  if (!isAdmin && hidden) {
    return null;
  }

  return (
    <div className="my-12 ">
      <DIALOG
        trigger={primaryText}
        triggerStyles={`${triggerClassName} capitalize`}
        title={title}
        closeId={""}
      >
        <Card>
          <CardContent className="flex flex-col items-center justify-center">
            {confirmText && (
              <div
                className="_label mb-6"
                dangerouslySetInnerHTML={{ __html: confirmText }}
              />
            )}
            <Button
              waiting={waiting}
              disabled={waiting}
              primaryText={`Confirm ${primaryText}`}
              waitingText={loadingText}
              onClick={handleAction}
              className={`${className} ${
                variant == "destructive"
                  ? "_deleteBtn"
                  : variant == "primary"
                  ? "_primaryBtn"
                  : variant == "secondary"
                  ? "_secondaryBtn"
                  : variant == "outline"
                  ? "border rounded-md "
                  : ""
              }`}
            >
              {children}
            </Button>
          </CardContent>
        </Card>
      </DIALOG>
    </div>
  );
};
