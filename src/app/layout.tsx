import { ReactNode } from "react";
import ClientLayout from "./ClientLayout";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

 