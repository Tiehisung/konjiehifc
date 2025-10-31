"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import FooterCP from "@/components/footer/FooterCp";
import HeaderCp from "@/components/HeaderCp";
import BackToTopButton from "@/components/scroll/ToTop";
import AuthProvider from "@/providers/AuthProvider";
import RTKStoreProvider from "@/providers/RtkProvider";
import { ThemeProvider } from "next-themes";
 
export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const className = pathname.includes("/admin") ? "" : "px-[2vw]";

  return (
    <RTKStoreProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderCp />
          <div className={`min-h-screen overflow-x-hidden ${className}`}>
            {children}
            <BackToTopButton />
            <Toaster position="top-right" richColors />
          </div>
          <FooterCP />
        </ThemeProvider>
      </AuthProvider>
    </RTKStoreProvider>
  );
}
