import React, { FC, ReactNode } from "react";


const NewsLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  // const news: INewsProps[] = (await getNews())?.data;
  // if (!news) return null;
  return (
    <div className="md:flex items-start gap-3 relative">
      <main className="grow">{children}</main>
      {/* <aside className=" sticky top-12 space-y-4 md:w-80">
        <HotNews news={news} />
        <FeaturedNews news={news} />
      </aside> */}
    </div>
  );
};

export default NewsLayout;
