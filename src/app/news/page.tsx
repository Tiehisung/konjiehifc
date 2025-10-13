import { IFileProps, IFileUpload } from "@/types";
import React from "react";

import { getNews } from "../admin/news/page";
import { Reveal } from "@/components/Animate/Reveal";
import Image from "next/image";
import { broadcasters } from "@/assets/broadcaster/broadcaster";
import { getFormattedDate } from "@/lib/timeAndDate";
import BreakingNews from "./BreakingNews";
import Link from "next/link";
const casters = Object.values(broadcasters);

const NewsPage = async () => {
  const news: INewsProps[] = await getNews();
  return (
    <main className="my-5 container grid gap-6 md:flex items-start ">
      <BreakingNews newsItem={news?.[3]} />
      <div  >
        {news?.slice(0, 5)?.map((item, index) => (
          <NewsItem key={index} item={item} />
        ))}
      </div>
    </main>
  );
};

export default NewsPage;

const NewsItem = ({ item }: { item: INewsProps }) => {
  return (
    <Reveal className="w-full grow mb-4">
      <Link
        href={`/news/${item._id}`}
        className={`w-full grow grid sm:flex flex-wrap items-start justify-start h-44 border _borderColor rounded-xl dark:hover:border-white`}
      >
        <section className=" max-sm:grow ">
          <Image
            src={item?.headline?.image?.secure_url as string}
            width={400}
            height={400}
            alt={item?.headline?.text as string}
            className="h-44 rounded-xl max-w-44 object-cover _secondaryBg"
          />
        </section>

        <section className="p-4 w-72 h-full overflow-hidden grid justify-between">
          <div className="_subtitle line-clamp-4 max-w-72">
            {item?.headline?.text?.substring(0, 120) as string}
          </div>

          <div
            className="mt-5 _pp max-w-full line-clamp-3 max-h-14 overflow-hidden "
            dangerouslySetInnerHTML={{
              __html:
                (item?.details?.find((d) => d.isText)?.text as string) ?? "",
            }}
          />

          <div className="inline-flex gap-2 mt-5">
            <Image
              src={casters[2]}
              width={100}
              height={100}
              alt={item?.headline?.text as string}
              className="h-5 w-auto object-contain my-2"
            />
            <p className="_pp">
              {getFormattedDate(item.createdAt, "March 2, 2025")}
            </p>
          </div>
        </section>
      </Link>
    </Reveal>
  );
};

export interface INewsProps {
  _id: string;
  stats?: {
    isTrending: boolean;
    isLatest: boolean;
  };
  headline: {
    text: string;
    image: Partial<IFileProps>;
    hasVideo?: boolean;
    sponsor?: Partial<IFileProps>;
  };
  details: {
    isText: boolean;
    _id?: string;
    text?: string;
    media?: Partial<IFileProps>[];
  }[];
  reporter?: {
    name: string;
    avatar: Partial<IFileProps>;
  };
  createdAt: string;
  updatedAt: string;
}
export interface IPostNews {
  stats?: {
    isTrending: boolean;
    isLatest: boolean;
  };
  headline: {
    text: string;
    image: Partial<IFileUpload>;
    hasVideo?: boolean;
    sponsor?: Partial<IFileUpload>;
  };
  details: {
    _id?: string;
    text?: string;
    isText: boolean;
    media?: IFileUpload[];
  }[];
  reporter?: {
    name: string;
    avatar: Partial<IFileProps>;
  };
}
