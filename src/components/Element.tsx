import { ReactNode } from "react";

import {
  Noto_Sans_Georgian,
  Titillium_Web,
  Ibarra_Real_Nova,
} from "next/font/google";
import { cn } from "@/lib/utils";

const georgia = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: "700",
  display: "swap",
  variable: "--font-georgia",
});
const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const nova = Ibarra_Real_Nova({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export default function HEADER({
  subtitle,
  title,
  children,
  className = "text-Orange",
  isPage = true,
}: {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
  isPage?: boolean;
}) {
  return (
    <header
      className={cn(
        `border-b border-border bg-linear-to-r from-primary via-primary/60 to-primary/90 grow py-5 md:py-10 px-4 ${className}`,
        georgia.className
      )}
    >
      <div className={` mx-auto ${isPage ? "_page" : ""}`}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {title}
        </h1>

        <p className={` font-light ${titillium.className}`}>{subtitle}</p>
      </div>
      {children}
    </header>
  );
}

interface IProps {
  text: string;
  icon?: React.ReactNode;
}

export function TITLE({ text, icon }: IProps) {
  return (
    <div className="flex items-center gap-3.5 group">
      {icon && (
        <span className="text-2xl text-muted-foreground group-hover:text-foreground">
          {icon}
        </span>
      )}
      <h1 className={cn("font-bold text-[20px] leading-7 ", nova.className)}>
        {text}
      </h1>
    </div>
  );
}
