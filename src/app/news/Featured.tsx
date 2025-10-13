import React from "react";
import { INewsProps } from "./page";
import Link from "next/link";
import SimpleCarousel from "@/components/carousel/SimpleCarousel";

const FeaturedNews = ({ news }: { news: INewsProps[] }) => {
  return (
    <div className="space-y-2">
      <h1 className="_subtitle">FeaturedNews</h1>
      <SimpleCarousel className="_hideScrollbar max-md:w-full">
        {news?.map((item, i) => (
          <div key={i}>
            <Link
              style={{
                backgroundImage: `url(${item.headline.image.secure_url})`,
              }}
              href={`/news/${item._id}`}
              className="flex w-44 h-32 _label card border _borderColor overflow-hidden hover:border-background bg-cover object-cover"
            >
              <span className=" p-2 bg-gradient-to-b from-[#292929] to-transparent line-clamp-4">
                {item.headline.text}
              </span>
            </Link>
          </div>
        ))}
      </SimpleCarousel>
    </div>
  );
};

export default FeaturedNews;
