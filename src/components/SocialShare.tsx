"use client";

import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { getUrlToShare } from "@/lib";
import { CopyButton } from "./buttons/CopyBtn";
import { FaXTwitter } from "react-icons/fa6";
import { ImWhatsapp } from "react-icons/im";
import { BsTelegram } from "react-icons/bs";
import { PiTelegramLogoLight } from "react-icons/pi";

// Custom share button components that match dv-social-share functionality
export const FBShareBtn: React.FC<{ url: string; openInNewTab?: boolean }> = ({
  url,
  openInNewTab = false,
}) => {
  const handleClick = (): void => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    if (openInNewTab) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = shareUrl;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex items-center justify-center w-10 h-10 rounded-lg bg-popover _hover transition-all duration-200 hover:scale-105"
      title="Share on Facebook"
    >
      <Facebook
        size={20}
        className=" group-hover:text-muted-foreground transition-colors duration-200"
      />
    </button>
  );
};

export const LinkedInShareBtn: React.FC<{ url: string; openInNewTab?: boolean }> = ({
  url,
  openInNewTab = false,
}) => {
  const handleClick = (): void => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    if (openInNewTab) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = shareUrl;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex items-center justify-center w-10 h-10 rounded-lg bg-popover _hover transition-all duration-200 hover:scale-105"
      title="Share on LinkedIn"
    >
      <Linkedin
        size={20}
        className=" group-hover:text-muted-foreground transition-colors duration-200"
      />
    </button>
  );
};

export const WhatsAppShareBtn: React.FC<{ url: string; openInNewTab?: boolean }> = ({
  url,
  openInNewTab = false,
}) => {
  const handleClick = (): void => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
    if (openInNewTab) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = shareUrl;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex items-center justify-center w-10 h-10 rounded-lg bg-popover _hover transition-all duration-200 hover:scale-105"
      title="Share on WhatsApp"
    >
      <ImWhatsapp
        size={20}
        className=" group-hover:text-muted-foreground transition-colors duration-200"
      />
    </button>
  );
};

export const TwitterShareBtn: React.FC<{ url: string; openInNewTab?: boolean }> = ({
  url,
  openInNewTab = false,
}) => {
  const handleClick = (): void => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}`;
    if (openInNewTab) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = shareUrl;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex items-center justify-center w-10 h-10 rounded-lg bg-popover _hover transition-all duration-200 hover:scale-105"
      title="Share on Twitter"
    >
      <FaXTwitter
        size={20}
        className=" group-hover:text-muted-foreground transition-colors duration-200"
      />
    </button>
  );
};

const SocialShare: React.FC = ({ className }: { className?: string }) => {
  const url = getUrlToShare();

  return (
    <div className={`flex gap-2 mt-2 ${className}`}>
      <CopyButton textToCopy={url} />
      <FBShareBtn url={url} openInNewTab />
      <LinkedInShareBtn url={url} openInNewTab />
      <WhatsAppShareBtn url={url} openInNewTab />
      <TwitterShareBtn url={url} openInNewTab />
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


