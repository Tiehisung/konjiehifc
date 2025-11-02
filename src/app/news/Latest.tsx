import { IQueryResponse } from "@/types";
import Link from "next/link";
import { INewsProps } from "./page";
import { getNews } from "../admin/news/page";
import Image from "next/image";

export async function LatestNews() {
  const news: IQueryResponse<INewsProps[]> = await getNews();

  return (
    <div>
      <div className="_heading">LATEST</div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 gap-y-8">
        {news?.data?.slice(4)?.map((item) => (
          <div key={item._id}>
            <Link href={`/news/${item?._id}`}>
              <div className="w-full overflow-hidden group relative">
                <Image
                  src={item?.headline?.image as string}
                  width={400}
                  height={500}
                  alt={item?.headline.text}
                  className="aspect-4/2 w-full bg-secondary object-cover group-hover:opacity-85 xl:aspect-5/3 group-hover:scale-105 _slowTrans "
                />
                <div className="py-4">
                  <p className="_p line-clamp-3">{item?.headline?.text}</p>
                </div>

                {
                  // item?.headline.hasVideo &&
                  <span className="bg-card px-3 py-1.5 w-24 flex justify-center absolute top-1.5 right-2 shadow-sm">
                    Watch
                  </span>
                }
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
