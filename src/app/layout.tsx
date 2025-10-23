"use client";

import HeaderCp from "../components/HeaderCp";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import RTKStoreProvider from "@/providers/RtkProvider";
import FooterCP from "@/components/footer/FooterCp";
import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "sonner";
import BackToTopButton from "@/components/scroll/ToTop";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/providers/theme";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const className = pathname.includes("/admin") ? "" : "px-[2vw]";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative">
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
        <ToastContainer />
      </body>
    </html>
  );
}
