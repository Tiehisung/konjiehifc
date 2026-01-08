// hooks/use-refetch-on-refresh.ts
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRefetchOnRefresh(refetch: () => void) {
  const router = useRouter();

  useEffect(() => {
    const originalRefresh = router.refresh;

    router.refresh = () => {
      refetch();
      return originalRefresh.call(router);
    };

    return () => {
      router.refresh = originalRefresh;
    };
  }, [router, refetch]);
}
