"use client";

import { Button } from "@/components/buttons/Button";
import { fireEscape } from "@/hooks/Esc";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import React, { CSSProperties, ReactNode, useState } from "react";
import { toast } from "sonner";

interface IProps {
  className?: string;
  variant?: "outline" | "destructive" | "secondary" | "primary";
  primaryText?: string;
  loadingText?: string;
  children?: ReactNode;
  uri?: string;
  method: "PUT" | "POST" | "DELETE" | "GET";
  body?: unknown;
  escapeOnEnd?: boolean;
  styles?: CSSProperties;
}

export function ActionButton({
  variant = "primary",
  className,
  method = "GET",
  body,
  children,
  loadingText,
  uri,
  primaryText,
  escapeOnEnd = false,
  styles = {},
}: IProps) {
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
      toast.info(results.message);
      setWaiting(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
      router.refresh();
      if (escapeOnEnd) fireEscape();
    }
  };
  return (
    <Button
      waiting={waiting}
      disabled={waiting}
      primaryText={primaryText}
      waitingText={loadingText}
      onClick={handleAction}
      className={`${className} `}
      styles={styles}
      variant={variant}
    >
      {children}
    </Button>
  );
}
