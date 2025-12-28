"use client";

import Link from "next/link";
import { SearchX } from "lucide-react";

 
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <div className="flex flex-col items-center space-y-6">
        <SearchX className="w-20 h-20 text-gray-400" />

        <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>

        <p className="text-gray-600 max-w-md">
          The page you're looking for does not exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
