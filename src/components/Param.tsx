"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useGetParam = (queryKey: string): string => {
  const sp = useSearchParams();
  const [paramValue, setParamValue] = useState<string | null | undefined>("");
  useEffect(() => {
    const pv = sp.get(queryKey);
    setParamValue(pv);
  }, [sp]);
  return paramValue ?? "";
};

export default useGetParam;
