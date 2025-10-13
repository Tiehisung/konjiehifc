import React, { FC, ReactNode } from "react";
import { HotNews } from "./Hot";
import FeaturedNews from "./Featured";
import { getNews } from "../admin/news/page";
import { INewsProps } from "./page";

const NewsLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const news: INewsProps[] = await getNews();
  if(!news)return null
  return (
    <div className="md:flex items-start gap-3 relative">
      <main className="grow md:max-w-[70vw]">{children}</main>
      <aside className=" sticky top-12 space-y-4 md:w-80">
        <HotNews news={news} />
        <FeaturedNews news={news}/>
      </aside>
    </div>
  );
};

export default NewsLayout;
