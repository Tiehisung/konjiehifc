"use client";

import { Facebook, Linkedin, Twitter } from "lucide-react";
import { ImWhatsapp } from "react-icons/im";
import { PiTelegramLogoLight } from "react-icons/pi";
import { Button } from "./ui/button";
import { share, ShareOptions } from "@/lib/share";
import { ReactNode } from "react";

interface IProps extends ShareOptions {
  isMini?: boolean;
  className?: string;
  wrapperStyles?: string;
  label?: ReactNode;
}

export const SocialShare = ({
  text,
  title,
  url,
  files = [],
  isMini,
  className,
  wrapperStyles,
  label = "Share page",
}: IProps) => {
  return (
    <div className={`grid gap-2 ${wrapperStyles}`}>
      {!isMini && label && <h1 className="font-semibold">{label}</h1>}
      {Object.entries(socialMediaIcons).map(([platform]) => {
        return (
          <Button
            variant="outline"
            size="sm"
            className={`gap-2 grow ${className}`}
            onClick={() => {
              share.toSocial(platform as keyof typeof socialMediaIcons, {
                title,
                text,
                url: url,
                files,
              });
            }}
          >
            {socialMediaIcons[platform as keyof typeof socialMediaIcons].icon}
            {isMini ? "" : platform}
          </Button>
        );
      })}
    </div>
  );
};
export default SocialShare;

export const socialMediaIcons = {
  facebook: { icon: <Facebook />, alias: "fb" },
  whatsapp: { icon: <ImWhatsapp />, alias: "wa" },
  linkedin: { icon: <Linkedin />, alias: "in" },
  telegram: { icon: <PiTelegramLogoLight />, alias: "tg" },
  twitter: { icon: <Twitter />, alias: "x" },
  // instagram: { icon: Instagram, alias: "ig" },
};
