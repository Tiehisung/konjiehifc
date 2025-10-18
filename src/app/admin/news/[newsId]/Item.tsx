"use client";

import React, { FC, useState } from "react";
import FileRenderer from "@/components/files/FileRender";
import Image from "next/image";
import { IFileProps } from "@/types";
import { INewsProps } from "@/app/news/page";
import UnpublishNews from "./Delete";

const NewsItemClient: FC<{ newsItem: INewsProps }> = ({ newsItem }) => {
  const [loadingImage, setLoadingImage] = useState(false);

  console.log({ newsItem });
  return (
    <div className=" mb-10 p-4">
      <header className="flex flex-wrap justify-center items-center">
        <p className="font-semibold text-3xl md:text-4xl overflow-hidden mb-7">
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
        <main className="_p space-y-5 grow">
          <section>
            {newsItem?.details?.map((detail, index) => {
              return (
                <>
                  <div
                    key={index}
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
                </>
              );
            })}
          </section>

          {/* Comments and reactions */}
          <section className="_subtitle">
            
            <h1>Actions</h1>
            <div className="flex items-center gap-5 flex-wrap p-4 _card">
              <UnpublishNews />
              <UnpublishNews />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default NewsItemClient;
