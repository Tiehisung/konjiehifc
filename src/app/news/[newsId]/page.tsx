import { getNews } from "@/app/admin/news/page";
import React, { Suspense } from "react";
import { INewsProps } from "../page";
import NewsItemClient from "./Item";
import Skeleton from "react-loading-skeleton";
import YouMayLike from "../YouMayLike";

interface Props {
  params: Promise<{ newsId: string }>;
}

const NewsItemPage = async ({ params }: Props) => {
  const newsItem: INewsProps = await getNews((await params).newsId);

  if (!newsItem) return null;

  return (
    <div className="_page">
      <NewsItemClient newsItem={newsItem} />

      <Suspense
        fallback={
          <div>
            <Skeleton width={300} height={"200px"} className="" />
          </div>
        }
      >
        <YouMayLike />
      </Suspense>
    </div>
  );
};

export default NewsItemPage;
