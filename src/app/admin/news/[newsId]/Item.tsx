"use client";

import React, { FC, useState } from "react";
import FileRenderer from "@/components/files/FileRender";
import Image from "next/image";
import { IFileProps } from "@/types";
import { INewsProps } from "@/app/news/page";
import ActionButtonNews from "./Action";

const NewsItemClient: FC<{ newsItem: INewsProps }> = ({ newsItem }) => {
  const [loadingImage, setLoadingImage] = useState(false);

  console.log({ newsItem });
  return (
    <div className=" mb-10 p-4">
      <header className="flex flex-wrap justify-center items-center">
        <p className="_title">
          {newsItem?.headline?.text}
        </p>
        <Image
          width={1000}
          height={500}
          alt={newsItem.headline?.text}
          src={newsItem.headline?.image?.secure_url ?? ""}
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
            {newsItem?.details?.map((detail, index) => {
              return (
                <div key={index}>
                  <div
                    dangerouslySetInnerHTML={{ __html: detail?.text as string }}
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
            <div className="flex items-center gap-5 flex-wrap p-4 _card">
              {newsItem?.isPublished ? (
                <ActionButtonNews type="Unpublish" />
              ) : (
                <ActionButtonNews type="Publish" />
              )}

              <ActionButtonNews type="Delete" />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default NewsItemClient;
