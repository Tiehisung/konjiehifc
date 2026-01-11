import { IQueryResponse } from "@/types";
import { INewsProps } from "@/types/news.interface";
import { getNews } from "../admin/news/page";
import { markupToPlainText } from "@/lib/DOM";
import NewsCard from "./NewsCard";

export async function LatestNews() {
  const news: IQueryResponse<INewsProps[]> = await getNews();

  return (
    <div>
      <div className="_heading max-sm:text-center">LATEST NEWS</div>
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
            reactions={[
              item?.likes?.length ?? 0,
              item?.comments?.length ?? 0,
              item?.shares?.length ?? 0,
            ].reduce((acc, p) => acc + p, 0)}
          />
        ))}
      </section>
    </div>
  );
}
