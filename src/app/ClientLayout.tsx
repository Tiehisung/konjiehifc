"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import FooterCP from "@/components/footer/FooterCp";
import HeaderCp from "@/components/HeaderCp";
import BackToTopButton from "@/components/scroll/ToTop";
import AuthProvider from "@/providers/AuthProvider";
import { ThemeProvider } from "next-themes";
import { Swinger } from "@/components/Animate/Swing";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <HeaderCp />
        <div className={`min-h-screen overflow-x-hidden  `}>
          {children}
          <Swinger className='fixed bottom-6 right-6 z-30'>
            <BackToTopButton />
          </Swinger>
          <Toaster position="top-right" richColors />
        </div>
        <FooterCP />
      </ThemeProvider>
    </AuthProvider>
  );
}
