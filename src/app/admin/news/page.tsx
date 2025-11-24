import React from "react";
import { apiConfig } from "@/lib/configs";
import AdminNews from "./News";
import { IQueryResponse } from "@/types";
import { INewsProps } from "@/app/news/page";
import { buildQueryStringServer } from "@/lib";
import { NewsForm } from "./NewsForm";

export const getNews = async (query?: string) => {
  try {
    const uri = query ? `${apiConfig.news}${query}` : apiConfig.news;

    const response = await fetch(uri, { cache: "no-cache" });
    return await response.json();
  } catch {
    return null;
  }
};

export const getNewsItem = async (slug: string) => {
  try {
    const response = await fetch(`${apiConfig.news}/${slug}`, {
      cache: "no-store",
    });
    const news = await response.json();
    return news;
  } catch {
    return null;
  }
};

interface IPageProps {
  searchParams: Promise<
    Record<string, string | string[] | boolean | undefined>
  >;
}

const AdminNewsPage = async ({ searchParams }: IPageProps) => {
  const qs = buildQueryStringServer(await searchParams);

  const news: IQueryResponse<INewsProps[]> = await getNews(qs);

  return (
    <div>
      <h1 className="_title px-6 text-primaryRed uppercase">News Publisher </h1>
      <NewsForm />

      <AdminNews news={news} />
    </div>
  );
};

export default AdminNewsPage;
