import React, { FC, ReactNode } from "react";

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
    <div className="md:flex items-start gap-3 relative">
      <main className="grow">{children}</main>
    </div>
  );
};

export default NewsLayout;
