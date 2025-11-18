"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.back();
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(redirectTimer);
  }, [pathname]);

  return (
    <div className="w-full flex flex-col gap-3 justify-center items-center">
      <h2 className="">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="_primaryBtn p-2">
        Home
      </Link>
    </div>
  );
}
