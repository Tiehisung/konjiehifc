import React, { FC } from "react";
import { INewsProps } from "./page";
import Image from "next/image";
import Link from "next/link";

const BreakingNews: FC<{ newsItem: INewsProps }> = ({ newsItem }) => {
  if (!newsItem) return null;
  return (
    <Link href={`/news/${newsItem._id}`} className="max-w-80 overflow-x-hidden">
      <Image
        src={newsItem?.headline?.image?.secure_url as string}
        width={700}
        height={600}
        alt={newsItem?.headline?.text as string}
        className="h-auto grow w-80 rounded-badge min-w-60"
      />
      <div>
        <p className="_subtitle">{newsItem.headline.text}</p>

        <div
          className="mt-5 _p max-w-full line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: newsItem?.details?.find((d) => d.isText)?.text as string??'',
          }}
        />
      </div>
    </Link>
  );
};

export default BreakingNews;
