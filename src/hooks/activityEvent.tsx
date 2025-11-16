"use client";

import { fireEscape } from "@/hooks/Esc";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  loadingText?: string;
  uri?: string;
  method: "PUT" | "POST" | "DELETE" | "GET";
  body?: unknown;
  escapeOnEnd?: boolean;
  showLoader?: boolean;
}

export function useAction() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async ( {
    method = "GET", body, uri, escapeOnEnd = false,
}: IProps) => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      router.refresh();
      if (escapeOnEnd) fireEscape();
    }
  };

  return { handleAction, isLoading };
}
