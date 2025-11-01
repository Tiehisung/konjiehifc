"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

export function useUpdateSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value.length > 0) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  function clearParams() {
    router.replace(pathname, { scroll: false });
    router.refresh();
  }

  return { setParam, clearParams };
}
