import { IQueryResponse } from "@/types";
import { INewsProps } from "./page";
import { getNews } from "../admin/news/page";
import { markupToPlainText } from "@/lib/DOM";
import NewsCard from "./NewsItemCard";

export async function LatestNews() {
  const news: IQueryResponse<INewsProps[]> = await getNews();

  return (
    <div>
      <div className="_heading">LATEST</div>
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
    </div>
  );
}
