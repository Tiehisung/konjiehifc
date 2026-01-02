"use client";

import React, { FC, useState } from "react";
import FileRenderer from "@/components/files/FileRender";
import Image from "next/image";
import { IFileProps } from "@/types/file.interface";
import { INewsProps } from "@/app/news/page";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { apiConfig } from "@/lib/configs";
import { shortText } from "@/lib";
import Link from "next/link";

const NewsItemClient: FC<{ newsItem: INewsProps }> = ({ newsItem }) => {
 

  return (
    <div className=" mb-10 p-4">
      <header className="flex flex-wrap items-center gap-2.5">
        <Image
          width={1000}
          height={500}
          alt={newsItem?.headline?.text}
          src={newsItem?.headline?.image as string}
          className={`w-full min-w-64 h-auto bg-cover object-cover aspect-5/3 `}
        
    
        />
        <div
          dangerouslySetInnerHTML={{
            __html: newsItem?.headline?.text as string,
          }}
          className="text-lg md:text-lg mb-5 font-bold _title"
        />
      </header>

      <div className="grid lg:flex items-start mt-15 gap-x-6">
        <main className="_p grow my-6">
          <ul >
            {newsItem?.details?.map((detail, index) => {
              return (
                <li key={index} className="space-y-3.5 mb-4">
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
                </li>
              );
            })}
          </ul>

          {/* Comments and reactions */}
          <section className=" mt-32 border-t-2">
            <h1 className="_title text-muted-foreground">ACTIONS</h1>

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
