"use client";

import React, { FC, useState } from "react";
import FileRenderer from "@/components/files/FileRender";
import Image from "next/image";
import { IFileProps } from "@/types";
import { INewsProps } from "@/app/news/page";
import { ISquad } from "../../squad/page";
import { getFormattedDate } from "@/lib/timeAndDate";
import { useSession } from "next-auth/react";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { apiConfig } from "@/lib/configs";
import { shortText } from "@/lib";

const NewsItemClient: FC<{ newsItem: INewsProps }> = ({ newsItem }) => {
  const session = useSession();
  const [loadingImage, setLoadingImage] = useState(false);

  return (
    <div className=" mb-10 p-4">
      <header className="flex flex-wrap justify-center items-center">
        <p className="_title">{newsItem?.headline?.text}</p>
        <Image
          width={1000}
          height={500}
          alt={newsItem.headline?.text}
          src={newsItem.headline?.image as string}
          className={`w-full min-w-64 h-auto bg-cover object-cover aspect-5/3 ${
            loadingImage ? "bg-secondary" : ""
          }`}
          onLoad={() => setLoadingImage(true)}
          onLoadingComplete={() => setLoadingImage(false)}
        />
      </header>

      <div className="grid lg:flex items-start mt-6 gap-x-6">
        <main className="_p space-y-5 grow my-6">
          <section>
            {newsItem.type == "general" ? (
              newsItem?.details?.map((detail, index) => {
                return (
                  <div key={index}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: detail?.text as string,
                      }}
                    />

                    <div key={index} className="flex flex-wrap gap-4">
                      {detail?.media?.map((file, i) => {
                        if (file.secure_url)
                          return (
                            <FileRenderer file={file as IFileProps} key={i} />
                          );
                      })}
                    </div>
                  </div>
                );
              })
            ) : newsItem?.type == "squad" ? (
              <div>
                <h2 className="_subtitle">Squad News</h2>
                <ul className="flex items-center gap-4 flex-wrap">
                  {(newsItem?.metaDetails as ISquad)?.players?.map((player) => (
                    <li key={player._id} className="mb-2 _card">
                      <Image
                        width={1000}
                        height={500}
                        alt={player.name}
                        src={player?.avatar ?? ""}
                        className={`w-64 h-64 bg-cover object-cover aspect-square mb-2`}
                      />
                      <p className="_label">
                        {player.name} - {player.position}
                      </p>
                    </li>
                  ))}
                </ul>

                <div>
                  <h1>
                    Coach: {(newsItem.metaDetails as ISquad)?.coach?.name}
                  </h1>
                  <h1>
                    Assistant:{" "}
                    {(newsItem.metaDetails as ISquad)?.assistant?.name}
                  </h1>
                  <h1>
                    Match Date:{" "}
                    {getFormattedDate(
                      (newsItem.metaDetails as ISquad)?.match?.date
                    )}
                  </h1>
                  <h1>Time: {(newsItem.metaDetails as ISquad)?.match?.time}</h1>
                  <h1>
                    Venue:{" "}
                    {(newsItem.metaDetails as ISquad)?.match?.isHome
                      ? "Home"
                      : "Away"}
                  </h1>
                </div>
              </div>
            ) : (
              ""
            )}
          </section>

          {/* Comments and reactions */}
          <section className="_subtitle">
            <h1 className="_title">Actions</h1>

            <div className="flex items-center gap-5 flex-wrap p-4 _card">
              {newsItem?.isPublished ? (
                <ConfirmActionButton
                  primaryText="Unpublish News"
                  uri={`${apiConfig.news}/${newsItem?._id}`}
                  method={"PUT"}
                  escapeOnEnd
                  variant="destructive"
                  title="Delete News"
                  confirmText={`Are you sure you want to unpblish "<b>${shortText(
                    newsItem?.headline.text,
                    40
                  )}</b>"?`}
                  body={{
                    isPublished: false,
                  }}
                />
              ) : (
                <ConfirmActionButton
                  primaryText="Publish News"
                  uri={`${apiConfig.news}/${newsItem?._id}`}
                  method={"PUT"}
                  escapeOnEnd
                  title="Publish News to public"
                  confirmText={`Confirm to publish "<b>${shortText(
                    newsItem?.headline.text,
                    40
                  )}</b>"`}
                  body={{
                    isPublished: true,
                  }}
                />
              )}
              <ConfirmActionButton
                primaryText="Delete News"
                uri={`${apiConfig.news}/${newsItem?._id}`}
                method={"DELETE"}
                escapeOnEnd
                variant="destructive"
                title="Delete News"
                confirmText={`Are you sure you want to delete "<b>${shortText(
                  newsItem?.headline.text,
                  40
                )}</b>"?`}
                gobackAfter
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default NewsItemClient;
