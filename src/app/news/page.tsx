import { IFileProps, IFileUpload, IQueryResponse } from "@/types";
import React, { Suspense } from "react";

import { getNews } from "../admin/news/page";
import BestOfUs from "./BestOfUs";
import { LatestNews } from "./Latest";
import Skeleton from "react-loading-skeleton";
import YouMayLike from "./YouMayLike";
import NewsCard from "./NewsCard";
import { markupToPlainText } from "@/lib/DOM";
import { kfc } from "@/data/kfc";

export interface INewsProps {
  _id: string;
  slug: string;
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
  likes?: { name: string; date: string; device?: string }[];
  shares?: { name: string; date: string; device?: string }[];
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
