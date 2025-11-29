import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import OtherAdminNews from "./OtherNews";
import { SearchAndFilterNews } from "./SearchAndFilter";
import NewsItemClient from "./ClientItem";
import { INewsProps } from "@/app/news/page";
import { IQueryResponse, IRecord } from "@/types";
import { buildQueryStringServer } from "@/lib";
import { getNewsItem, getNews } from "@/app/admin/news/page";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

interface IProps {
  params: Promise<{ newsId: string }>;
  searchParams: Promise<IRecord>;
}

export default async function NewsItemPage({ params, searchParams }: IProps) {
  const newsItem: INewsProps = await getNewsItem((await params).newsId);
  const qs = buildQueryStringServer(await searchParams);
  const news: IQueryResponse<INewsProps[]> = await getNews(qs);
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

        <OtherAdminNews news={news}/>
      </section>
    </div>
  );
}
