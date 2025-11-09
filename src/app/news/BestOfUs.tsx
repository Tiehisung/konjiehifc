import React from "react";
import { getNews } from "../admin/news/page";
import { IQueryResponse } from "@/types";
import { INewsProps } from "./page";
import NewsCard from "./NewsItemCard";
import { markupToPlainText } from "@/lib/DOM";

const BestOfUs = async () => {
  const news: IQueryResponse<INewsProps[]> = await getNews();

  return (
    <div>
      <h1 className="_heading mb-6">BEST OF US</h1>
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
};

export default BestOfUs;
