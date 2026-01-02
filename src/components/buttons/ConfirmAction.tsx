"use client";

import { Button } from "@/components/buttons/Button";
import { DIALOG } from "@/components/Dialog";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { toast } from "sonner";
import { fireDoubleEscape } from "@/hooks/Esc";
import { TButtonVariant } from "../ui/button";

interface IProps {
  className?: string;
  variant?: TButtonVariant;
  confirmVariant?: TButtonVariant;
  primaryText?: string;
  loadingText?: string;
  children?: ReactNode;
  uri?: string;
  method: "PUT" | "POST" | "DELETE" | "GET";
  body?: unknown;
  escapeOnEnd?: boolean;
  title?: string;
  confirmText?: string;
  gobackAfter?: boolean;
  trigger?: ReactNode;
  triggerStyles?: string;
  hidden?: boolean;
  disabled?: boolean;
}

export const ConfirmActionButton = ({
  variant,
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
  hidden,
  trigger,
  triggerStyles = "",
  confirmVariant,
  disabled,
}: IProps) => {
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);

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
      if (escapeOnEnd) fireDoubleEscape(400);
    }
  };

  if (hidden) {
    return null;
  }

  return (
    <DIALOG
      trigger={trigger ?? primaryText}
      title={title}
      variant={variant}
      triggerStyles={triggerStyles}
      disabled={disabled}
    >
      <div className="flex flex-col items-center justify-center py-6 ">
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
          className={className}
          variant={confirmVariant ?? variant}
        >
          {children}
        </Button>
      </div>
    </DIALOG>
  );
};
