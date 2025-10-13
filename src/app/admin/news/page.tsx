import React from "react";
import CreateNews from "./CreateNews";
import { apiConfig } from "@/lib/configs";
import AdminNews from "./News";
export const getNews = async (id?: string) => {
  try {
    if (id) {
      const response = await fetch(`${apiConfig.news}/${id}`, {
        cache: "no-store",
      });
      const news = await response.json();
      return news; //One
    } else {
      const response = await fetch(apiConfig.news, { cache: "no-cache" });
      const news = await response.json();
      return news;
    }
  } catch (error) {
    console.log({ error });
    return [];
  }
};

const AdminNewsPage = async () => {
  const news = await getNews();
 
  return (
    <div>
      <h1 className="_title px-6 text-primaryRed">News Publisher page</h1>
      <CreateNews />

      <AdminNews news={news} />
    </div>
  );
};

export default AdminNewsPage;
