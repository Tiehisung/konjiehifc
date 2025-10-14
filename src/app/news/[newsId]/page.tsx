import { getNews } from "@/app/admin/news/page";
import React from "react";
import { INewsProps } from "../page";
import NewsItemClient from "./Item";

interface Props {
  params:Promise< { newsId: string }>;
}

const NewsItemPage = async ({ params }: Props) => {
  
  const newsItem: INewsProps = await getNews((await params).newsId);
  
  if (!newsItem) return null;

  return (
    <div>
      <NewsItemClient newsItem={newsItem} />
    </div>
  );
};

export default NewsItemPage;
