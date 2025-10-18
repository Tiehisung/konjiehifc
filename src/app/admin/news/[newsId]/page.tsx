import { getNews } from "@/app/admin/news/page";
import React, { Suspense } from "react";
import NewsItemClient from "./Item";
import Skeleton from "react-loading-skeleton";
import { INewsProps } from "@/app/news/page";

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
   
      </Suspense>
    </div>
  );
};

export default NewsItemPage;
