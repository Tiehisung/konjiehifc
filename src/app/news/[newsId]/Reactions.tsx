"use client";

import { Button } from "@/components/buttons/Button";
import { INewsProps } from "../page";
import { Share, ThumbsUp, SendHorizontal } from "lucide-react";
import { Input } from "@/components/input/Inputs";
import { ActionButton } from "@/components/buttons/ActionButton";
import { apiConfig } from "@/lib/configs";
import { POPOVER } from "@/components/ui/popover";
import SocialShare from "@/components/SocialShare";
import { useAction } from "@/hooks/activityEvent";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { staticImages } from "@/assets/images";
import { LiaCommentSolid } from "react-icons/lia";

export function NewsReactions({ newsItem }: { newsItem: INewsProps }) {
  const { handleAction: handleShare } = useAction();
  const { handleAction: handleComment, isLoading } = useAction();
  const [comment, setComment] = useState("");
  const session = useSession();
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
                  name: session?.data?.user?.name ?? "unknown",
                  date: new Date().toLocaleDateString(),
                  device: "unknown",
                },
              ],
            }}
            uri={`${apiConfig.news}/${newsItem?._id}`}
            className="p-0.5 h-14 w-14 _hover _shrink"
            styles={{ borderRadius: "100%" }}
            variant="secondary"
            loadingText=""
          >
            <ThumbsUp size={32} />
          </ActionButton>
          <span className="font-lght text-sm ">
            {newsItem?.likes?.length ?? ""} Likes
          </span>
        </li>
        <li>
          <POPOVER
            trigger={
              <div
                className="p-0.5 h-14 w-14 rounded-full _hover _shrink _secondaryBtn"
                style={{ borderRadius: "100%" }}
              >
                <Share size={24} />
              </div>
            }
          >
            <div
              onClick={() =>
                handleShare({
                  method: "PUT",  uri:`${apiConfig.news}/${newsItem?._id}`,
                  body: {
                    shares: [
                      ...(newsItem?.shares ?? []),
                      {
                        name: session?.data?.user?.name ?? "unknown",
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
          <span className="font-lght text-sm ">
            {newsItem?.shares?.length ?? ""} Shares
          </span>
        </li>
        <li>
          <div
            className="p-0.5 h-14 w-14 _hover rounded-full _shrink _secondaryBtn"
            style={{ borderRadius: "100%" }}
            onClick={() => document.getElementById("comment")?.focus()}
          >
            <LiaCommentSolid size={24} />
          </div>
          <span className="font-lght text-sm ">
            {newsItem?.comments?.length ?? ""} Comments
          </span>
        </li>

        <li>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();

              handleComment({
                method: "PUT",
                uri:`${apiConfig.news}/${newsItem?._id}`,
                body: {
                  comments: [
                    ...(newsItem?.comments ?? []),
                    {
                      name: session?.data?.user?.name ?? "unknown",
                      image:
                        session?.data?.user?.image ?? staticImages.avatar.src,
                      date: new Date().toLocaleDateString(),
                      comment
                    },
                  ],
                },
              });
            }}
            className="flex items-center border rounded-full bg-accent"
          >
            <Input
              name={"comment"}
              onChange={(e) => setComment(e.target.value)}
              className="rounded-full pl-3.5 border-none"
              others={{ disabled: isLoading }}
              placeholder="Write a comment..."
            />
            <Button
              type="submit"
              className="_primaryBtn backdrop-blur-2xl text-white rounded-full p-1 h-14 w-14"
              styles={{ borderRadius: "100%" }}
              waiting={isLoading}
              waitingText=''
            >
              <SendHorizontal size={20} />
            </Button>
          </form>
        </li>
      </ul>
    </div>
  );
}
