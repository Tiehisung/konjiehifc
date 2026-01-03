import Breadcrumbs from "@/components/Breadcrumbs";
import { FC, ReactNode } from "react";

export const metadata = {
  title: "News",
  description:
    "Latest Konjiehi FC news, press releases, and club announcements.",
  keywords: ["Konjiehi FC news", "football updates", "club news"],
  openGraph: {
    title: "Latest News – Konjiehi FC",
    description:
      "Stay updated on player news, transfers, and club announcements.",
    images: ["/kfc.png"],
  },
};

const NewsLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  return (
    <div className="pt-10 md:pt-20 ">
      <main className=" relative grow">
        <div className="">
          <Breadcrumbs />
        </div> 
        {children}
      </main>
    </div>
  );
};

export default NewsLayout;
