import { IQueryResponse } from "@/types";
import { Suspense } from "react";
import { getNews } from "../admin/news/page";
import { LatestNews } from "./Latest";
import Skeleton from "react-loading-skeleton";
import YouMayLike from "./YouMayLike";
import NewsCard from "./NewsCard";
import { markupToPlainText } from "@/lib/DOM";
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
  const news: IQueryResponse<INewsProps[]> = await getNews();
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
              id={item?.slug}
              title={item?.headline?.text}
              summary={markupToPlainText(
                item?.details?.find((d) => d.text)?.text as string
              )}
              image={item?.headline?.image}
              date={item?.createdAt}
              tags={item?.tags}
            />
          ))}
        </section>
      </main>
    </>
  );
};

export default NewsPage;
