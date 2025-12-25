"use client";

import { fireDoubleEscape } from "@/hooks/Esc";
import { getErrorMessage } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { IQueryResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  loadingText?: string;
  uri?: string;
  method: "PUT" | "POST" | "DELETE" | "GET";
  body?: object;
  escapeOnEnd?: boolean;
  showLoader?: boolean;
  showToast?: boolean;
}

export function useAction() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAction = async ({
    method = "GET",
    body,
    uri,
    escapeOnEnd = false,
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
          body: JSON.stringify({
            ...body,
          }),
        }
      );
      const results: IQueryResponse = await response.json();
      if (results.success) {
        toast.success(results.message, { position: "bottom-center" });
        setError("");
      } else {
        toast.error(results.message);
        setError(getErrorMessage(error));
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
      router.refresh();
      if (escapeOnEnd) fireDoubleEscape();
    }
  };

  return { handleAction, isLoading, error };
}
