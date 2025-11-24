import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import OtherAdminNews from "./OtherNews";
import { SearchAndFilterNews } from "./SearchAndFilter";
import NewsItemClient from "./ClientItem";
import { getNews, getNewsItem } from "../page";
import { INewsProps } from "@/app/news/page";
import { IQueryResponse, IRecord } from "@/types";
import { buildQueryStringServer } from "@/lib";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

interface IProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<IRecord>;
}

export default async function NewsItemPage({ params, searchParams }: IProps) {
  const newsItem: INewsProps = await getNewsItem((await params).slug);
  const qs = buildQueryStringServer(await searchParams);
  const news: IQueryResponse<INewsProps[]> = await getNews(qs);
  return (
    <div
      className={cn(
        "flex max-lg:flex-wrap items-start gap-4 relative",
        inter.className
      )}
    >
      <section className="grow min-w-3/4">
        <NewsItemClient newsItem={newsItem} />
      </section>
      <section className="sticky top-0 pt-4">
        <SearchAndFilterNews />
        <br />

        <OtherAdminNews news={news}/>
      </section>
    </div>
  );
}
