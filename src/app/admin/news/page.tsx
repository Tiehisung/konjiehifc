import React from "react";
import CreateNews from "./CreateNews";
import { apiConfig } from "@/lib/configs";
import AdminNews from "./News";
import { IQueryResponse } from "@/types";
import { INewsProps } from "@/app/news/page";

export const getNews = async (isAdmin?: boolean) => {
  try {
    const uri = isAdmin ? `${apiConfig.news}?isAdmin=true` : apiConfig.news;

    const response = await fetch(uri, { cache: "no-cache" });
      return  await response.json();
  
  } catch {
    return null;
  }
};
export const getNewsById = async (id: string) => {
  try {
    const response = await fetch(`${apiConfig.news}/${id}`, {
      cache: "no-store",
    });
    const news = await response.json();
    return news;
  } catch {
    return null;
  }
};

const AdminNewsPage = async () => {
  const news: IQueryResponse<INewsProps[]> = await getNews(true);

  return (
    <div>
      <h1 className="_title px-6 text-primaryRed uppercase">News Publisher </h1>
      <CreateNews />
      {/* <RichTextEditor /> */}

      <AdminNews news={news} />
    </div>
  );
};

export default AdminNewsPage;
