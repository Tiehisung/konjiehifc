"use client";

import { Button } from "@/components/buttons/Button";
import { INewsProps } from "../page";
import { CgComment } from "react-icons/cg";
import { Share, ThumbsUp, SendHorizontal } from "lucide-react";
import { Input } from "@/components/input/Inputs";
import { ActionButton } from "@/components/buttons/ActionButton";
import { apiConfig } from "@/lib/configs";
import { POPOVER } from "@/components/ui/popover";
import SocialShare from "@/components/SocialShare";
import { useAction } from "@/hooks/activityEvent";

export function NewsReactions({ newsItem }: { newsItem: INewsProps }) {
  const { handleAction: handleShare } = useAction();
  return (
    <div>
      <ul className="flex items-center flex-wrap gap-4">
        <li>
          <ActionButton
            method="PUT"
            body={{
              likes: [
                ...(newsItem?.likes ?? []),
                {
                  name: "unknown",
                  date: new Date().toLocaleDateString(),
                  device: "unknown",
                },
              ],
            }}
            uri={`${apiConfig.news}/${newsItem?._id}`}
            className="p-2.5 _hover rounded-full _shrink"
          >
            <ThumbsUp size={20} />
          </ActionButton>
          <span>{newsItem?.likes?.length ?? 0}</span>
        </li>
        <li>
          <POPOVER
            trigger={
              <Button className="p-2.5 _hover rounded-full _shrink">
                <CgComment size={20} />
              </Button>
            }
          >
            <div
              onClick={() =>
                handleShare({
                  method: "PUT",
                  body: {
                    shares: [
                      ...(newsItem?.shares ?? []),
                      {
                        name: "unknown",
                        date: new Date().toLocaleDateString(),
                        device: "unknown",
                      },
                    ],
                  },
                })
              }
            >
              <SocialShare />
            </div>
          </POPOVER>
          <span>{newsItem?.comments?.length ?? 0} Comments</span>
        </li>
        <li>
          <Share className="p-2.5 _hover rounded-full _shrink">
            <Share size={20} />
          </Share>
          <span>{newsItem?.shares?.length ?? 0} Shares</span>
        </li>

        <li>
          <form className="flex items-center border rounded-full bg-accent">
            <Input
              name={""}
              onChange={(e) => console.log(e.target.value)}
              className="rounded-full pl-3.5 border-none"
            />
            <Button
              type="submit"
              className="_primaryBtn backdrop-blur-2xl text-white rounded-full p-1 h-9 w-9"
              styles={{ borderRadius: "100%" }}
            >
              <SendHorizontal size={28} />
            </Button>
          </form>
        </li>
      </ul>
    </div>
  );
}
