"use client";

import React, { FC, useState } from "react";
import FileRenderer from "@/components/files/FileRender";
import Image from "next/image";
import { IFileProps } from "@/types";
import { INewsProps } from "@/app/news/page";
import { ISquad } from "../../squad/page";
import { formatDate } from "@/lib/timeAndDate";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { apiConfig } from "@/lib/configs";
import { shortText } from "@/lib";
import Link from "next/link";

const NewsItemClient: FC<{ newsItem: INewsProps }> = ({ newsItem }) => {
  const [loadingImage, setLoadingImage] = useState(false);

  return (
    <div className=" mb-10 p-4">
      <header className="flex flex-wrap items-center gap-2.5">
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
        <div
          dangerouslySetInnerHTML={{
            __html: newsItem?.headline?.text as string,
          }}
          className="text-lg md:text-lg mb-5 font-bold "
        />
      </header>

      <div className="grid lg:flex items-start mt-15 gap-x-6">
        <main className="_p space-y-5 grow my-6">
          <section>
            {newsItem?.details?.map((detail, index) => {
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
            })}
          </section>

          {/* Comments and reactions */}
          <section className="_subtitle">
            <h1 className="_title">Actions</h1>

            <div className="flex items-center gap-5 flex-wrap p-4 py-8 border-y ">
              <Link
                href={`/admin/news/edit?newsId=${newsItem?._id}`}
                className="_primaryBtn"
              >
                Edit
              </Link>
              {newsItem?.isPublished ? (
                <ConfirmActionButton
                  primaryText="Unpublish"
                  trigger={<span className="_primaryBtn">Unpublish </span>}
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
                  primaryText="Publish"
                  trigger={<span className="_primaryBtn">Publish </span>}
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
                trigger={<span className="_deleteBtn">Delete </span>}
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
