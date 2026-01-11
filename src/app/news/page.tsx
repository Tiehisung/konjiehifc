import { IQueryResponse } from "@/types";
import { Suspense } from "react";
import { getNews } from "../admin/news/page";
import { LatestNews } from "./Latest";
import Skeleton from "react-loading-skeleton";
import YouMayLike from "./YouMayLike";
import { kfc } from "@/data/kfc";
import { INewsProps } from "@/types/news.interface";

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
  // console.log(news);
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
            fallback={<Skeleton width={300} height={"200px"} className="" />}
          >
            <LatestNews />
          </Suspense>

          <Suspense
            fallback={<Skeleton width={300} height={"200px"} className="" />}
          >
            <YouMayLike />
          </Suspense>
        </section>
      </main>
    </>
  );
};

export default NewsPage;
