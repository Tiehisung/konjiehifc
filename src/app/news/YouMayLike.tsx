import React from "react";
import { getNews } from "../admin/news/page";
import { IQueryResponse } from "@/types";
import { INewsProps } from "./page";
import Image from "next/image";
import Link from "next/link";
import { RxVideo } from "react-icons/rx";
import { AnimateOnView } from "@/components/Animate/AnimateOnView";

const YouMayLike = async () => {
  const news: IQueryResponse<INewsProps[]> = await getNews();

  return (
    <div>
      <h1 className="_heading mb-6 text-center">YOU MAY LIKE</h1>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 gap-y-10">
        {news?.data?.slice(0, 6)?.map((item,index) => (
          <AnimateOnView key={item._id } index={index}>
            <Link href={`/news/${item?._id}`}>
              <div className="w-full overflow-hidden group relative">
                <Image
                  src={item?.headline?.image?.secure_url as string}
                  width={400}
                  height={500}
                  alt={item?.headline.text}
                  className="aspect-4/2 w-full bg-secondary object-cover group-hover:opacity-85 xl:aspect-5/3 group-hover:scale-105 _slowTrans "
                />

                <div>
                  <p className="_p line-clamp-3">{item?.headline?.text}</p>
                </div>
                {item?.headline?.hasVideo && (
                  <RxVideo className="absolute bottom-1 right-1.5 text-primaryRed text-2xl" />
                )}
              </div>
            </Link>
          </AnimateOnView>
        ))}
      </div>
    </div>
  );
};

export default YouMayLike;
