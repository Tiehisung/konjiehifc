"use client";

import { share, ShareOptions } from "@/lib/share";
import { socialMediaIcons } from "./SocialShare";
import { Button } from "./ui/button";

export const SharePage = ({ text, title, url, files = [] }: ShareOptions) => {
  
  return (
    <div className="grid gap-2 ">
      <h1 className="font-semibold">Share page</h1>
      {Object.entries(socialMediaIcons).map(([platform]) => {
        return (
          <Button
            variant="outline"
            size="sm"
            className="gap-2 grow "
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
            {platform}
          </Button>
        );
      })}
    </div>
  );
};
