import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import OtherAdminNews from "./OtherNews";
import { SearchAndFilterNews } from "./SearchAndFilter";
import NewsItemClient from "./ClientItem";
import { INewsProps } from "@/types/news.interface";
import { IPageProps, IQueryResponse } from "@/types";
import { buildQueryStringServer } from "@/lib";
import { getNewsItem, getNews } from "@/app/admin/news/page";
import { Metadata } from "next";
import { kfc } from "@/data/kfc";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
   const slug = (await params).newsId as string;
  const article: INewsProps = await getNewsItem(slug);

  if (!article) {
    return {
      title: "News | Konjiehi FC",
      description: "Latest updates from Konjiehi FC",
    };
  }

  const title = `Konjiehi FC - ${article?.headline?.text} | Konjiehi FC`;
  const description =
    article?.details?.find(d=>d.text)?.text || "Read the latest news and updates from Konjiehi FC.";

  const image = article?.headline?.image || kfc.logo;
  const url = `${kfc.url}/news/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: kfc.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: article?.headline?.text,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function NewsItemPage({
  params,
  searchParams,
}: IPageProps) {
  const slug = (await params).newsId as string
  const newsItem: INewsProps = await getNewsItem(slug);
  const qs = buildQueryStringServer(await searchParams);
  const news: IQueryResponse<INewsProps[]> = await getNews(qs);

  console.log({ news });
  return (
    <div
      className={cn(
        "flex max-lg:flex-wrap items-start gap-6 relative pt-6 p-4 md:pl-10",
        inter.className
      )}
    >
      <section className="grow min-w-3/4">
        <NewsItemClient newsItem={newsItem} />
      </section>
      <section className="sticky top-0 pt-4 ">
        <SearchAndFilterNews />
        <br />

        <OtherAdminNews news={news} />
      </section>
    </div>
  );
}
