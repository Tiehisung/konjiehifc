import { IFileProps, IFileUpload, IQueryResponse } from "@/types";
import React, { Suspense } from "react";

import { getNews } from "../admin/news/page";
import { Reveal } from "@/components/Animate/Reveal";
import Image from "next/image";
import { formatDate } from "@/lib/timeAndDate";
import Link from "next/link";
import BestOfUs from "./BestOfUs";
import { LatestNews } from "./Latest";
import Skeleton from "react-loading-skeleton";
import YouMayLike from "./YouMayLike";
import NewsCard from "./NewsItemCard";
import { markupToPlainText } from "@/lib/DOM";
import { kfc } from "@/data/kfc";

export interface INewsProps {
  _id: string;
  stats?: {
    isTrending: boolean;
    isLatest: boolean;
  };
  headline: {
    text: string;
    image: string;
    hasVideo?: boolean;
    sponsor?: Partial<IFileProps>;
  };
  details: {
    _id?: string;
    text?: string;
    media?: Partial<IFileProps>[];
  }[];
  metaDetails?: unknown; //ISquad etc
  reporter?: {
    name: string;
    avatar: string;
  };
  isPublished?: boolean;
  type?: "squad" | "signing" | "match" | "training" | "general";
  summary?: string;
  tags?: string[];
  comments?: { image?: string; name?: string; comment: string; date: string }[];
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
    media?: IFileUpload[];
  }[];
  reporter?: {
    name: string;
    avatar: Partial<IFileProps>;
  };
}

export const metadata = {
  title: "Club News | Konjiehi FC",
  description:
    "Latest news, updates, transfers and announcements from Konjiehi FC.",
  openGraph: {
    title: "Konjiehi FC News",
    description: "Stay informed with the latest club news.",
    url: `${kfc.url}/news`,
    siteName: kfc.name,
    images: [`${kfc.logo}`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Konjiehi FC News",
    description: "Latest news & headlines from Konjiehi FC.",
    images: [`${kfc.logo}`],
  },
};

const NewsPage = async () => {
  const news: IQueryResponse<INewsProps[]> = await getNews();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsMediaOrganization",
            name: kfc.name,
            logo: kfc.logo,
            url: `${kfc.logo}/news`,
          }),
        }}
      />

      <main className="my-5 container _page ">
        <section className="space-y-10">
          <Suspense
            fallback={
              <div>
                <Skeleton width={300} height={"200px"} className="" />
              </div>
            }
          >
            <BestOfUs />
          </Suspense>

          <Suspense
            fallback={
              <div>
                <Skeleton width={300} height={"200px"} className="" />
              </div>
            }
          >
            <LatestNews />
          </Suspense>

          <Suspense
            fallback={
              <div>
                <Skeleton width={300} height={"200px"} className="" />
              </div>
            }
          >
            <YouMayLike />
          </Suspense>
        </section>
        <br />

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-6">
          {news?.data?.slice(0, 5)?.map((item) => (
            <NewsCard
              key={item?._id}
              id={item?._id}
              title={item?.headline?.text}
              summary={markupToPlainText(
                item?.details?.find((d) => d.text)?.text as string
              )}
              image={item?.headline?.image}
              date={item?.createdAt}
              tags={["transfer", "midfielder"]}
            />
          ))}
        </section>
      </main>
    </>
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
            src={item?.headline?.image as string}
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
              __html: (item?.details?.[0]?.text as string) ?? "",
            }}
          />

          <div className="inline-flex gap-2 mt-5">
            <Image
              src={kfc.logo}
              width={100}
              height={100}
              alt={item?.headline?.text as string}
              className="h-5 w-auto object-contain my-2"
            />
            <p className="_pp">{formatDate(item.createdAt, "March 2, 2025")}</p>
          </div>
        </section>
      </Link>
    </Reveal>
  );
};
