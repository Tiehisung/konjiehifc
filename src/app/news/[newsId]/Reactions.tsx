"use client";

import { Button } from "@/components/buttons/Button";
import { INewsProps } from "../page";
import { ThumbsUp, SendHorizontal, Dot } from "lucide-react";
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
import { IoShareSocial } from "react-icons/io5";
import { AVATAR } from "@/components/ui/avatar";
import { getTimeLeftOrAgo } from "@/lib/timeAndDate";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage, shortText } from "@/lib";
import { BsDot } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IUser } from "@/types/user";

export function NewsReactions({ newsItem }: { newsItem: INewsProps }) {
  const router = useRouter();
  const { handleAction: handleShare } = useAction();
  const [comment, setComment] = useState("");
  const session = useSession();
 

  const [waiting, setWaiting] = useState(false);

  const onComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setWaiting(true);
      const response = await fetch(`${apiConfig.news}/${newsItem?._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        body: JSON.stringify({
          comments: [
            {
              name: session?.data?.user?.name ?? "unknown",
              image: session?.data?.user?.image ?? staticImages.avatar.src,
              date: new Date().toISOString(),
              comment,
            },
            ...(newsItem?.comments ?? []),
          ],
        }),
      });
      const results = await response.json();
      if (results.success) {
        toast.success("Comment sent");
        setComment("");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setWaiting(false);
      router.refresh();
    }
  };
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
                  date: new Date().toISOString(),
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
                <IoShareSocial size={24} />
              </div>
            }
          >
            <div
              onClick={() =>
                handleShare({
                  method: "PUT",
                  uri: `${apiConfig.news}/${newsItem?._id}`,
                  body: {
                    shares: [
                      ...(newsItem?.shares ?? []),
                      {
                        name: session?.data?.user?.name ?? "unknown",
                        date: new Date().toISOString(),
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
            {newsItem?.comments?.length ?? ""} Comment
            {newsItem?.comments?.length == 1 ? "" : "s"}
          </span>
        </li>

        <li>
          <form
            onSubmit={onComment}
            className="flex items-center border rounded-full bg-accent"
          >
            <Input
              name={"comment"}
              onChange={(e) => setComment(e.target.value)}
              className="rounded-full pl-3.5 border-none"
              others={{ disabled: waiting, maxLength: 3500 }}
              placeholder="Write a comment..."
              required
              value={comment}
            />
            <Button
              type="submit"
              className="_primaryBtn backdrop-blur-2xl text-white rounded-full p-1 h-14 w-14"
              styles={{ borderRadius: "100%" }}
              waiting={waiting}
              waitingText=""
            >
              <SendHorizontal size={20} />
            </Button>
          </form>
        </li>
      </ul>

      <br />
      <hr />
      <br />

      {/* Comments */}
      <ul className="grid gap-6 divide-y-2">
        {newsItem?.comments?.map((com, i) => (
          <li key={`com-${i}`} className="flex items-start gap-5 pb-6 relative">
            <AVATAR src={com?.image ?? staticImages.avatar?.src} />
            <section>
              <div className="flex items-start gap-6">
                <div className="flex items-baseline gap-0.5">
                  <h1 className="_subtitle">{com?.name ?? "Anonymous"}</h1>
                  <span>
                    <BsDot size={15} className="text-muted-foreground" />
                  </span>
                  <span className="text-sm mt-2.5 font-light">
                    {getTimeLeftOrAgo(com?.date).formatted}
                  </span>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: shortText(com?.comment ?? "Hi", 4500),
                }}
                className=" border border-border rounded-2xl p-5 mt-4 _p"
              />
            </section>

            {(session?.data?.user as unknown as IUser)?.role?.includes('admin') && (
              <ActionButton
                method="PUT"
                body={{
                  likes: [
                    ...(newsItem?.comments?.filter(
                      (c) => c?.date !== com?.date
                    ) ?? []),
                  ],
                }}
                uri={`${apiConfig.news}/${newsItem?._id}`}
                className="absolute right-2 top-1 p-0.5 _hover _shrink"
                variant="secondary"
                loadingText="Deleting..."
                styles={{ padding: "6px" }}
              >
                <RiDeleteBin6Line size={24} />
              </ActionButton>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
