import { broadcasters } from "@/assets/broadcaster/broadcaster";
import { Reveal } from "@/components/Animate/Reveal";
import SimpleCarousel from "@/components/carousel/SimpleCarousel";
import { Title } from "@/components/Elements";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { INewsProps } from "./page";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { getNews } from "../admin/news/page";
import { IQueryResponse } from "@/types";

const casters = Object.values(broadcasters);
const LandingNewsHeadlines = async () => {
  const news: IQueryResponse<INewsProps[]> = await getNews();
  return (
    <div>
      <Title>News</Title>

      <SimpleCarousel className="_hideScrollbar" scrollButtonStyles="top-1/3">
        {news?.data?.map((item, index) => (
          <Link href={`/news/${item._id}`} key={index}>
            <Card className="w-60 sm:max-w-60 max-sm:grow overflow-hidden rounded-none">
              <CardContent>
                <Image
                  src={item?.headline?.image?.secure_url as string}
                  width={400}
                  height={400}
                  alt={item?.headline?.text as string}
                  className="h-44 w-full max-w-60 rounded-badge object-cover min-w-60"
                />
                <Image
                  src={(casters[index] as StaticImageData) ?? casters[2]}
                  width={100}
                  height={100}
                  alt={item?.headline?.text as string}
                  className="h-5 w-auto object-contain my-2"
                />
                <div className="font-semibold line-clamp-2 h-11 max-w-60 overflow-hidden">
                  {item?.headline?.text as string}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </SimpleCarousel>
    </div>
  );
};

export default LandingNewsHeadlines;

export const NewsInPage = ({ news }: { news: INewsProps[] }) => {
  return (
    <div className="relative flex items-start gap-2 ">
      <main className="my-5 ">
        {news?.map((item, index) => {
          const firstText = item?.details?.find((det) => det?.text)?.text;
          const text =
            (firstText?.length ?? 0) > 100
              ? `${firstText?.substring(0, 97)}...`
              : item.details.find((det) => det.text)?.text;
          console.log(text?.length);
          return (
            <Reveal
              key={index}
              className="grid sm:flex items-start justify-start border-b _borderColor pb-4 mb-6 grow"
            >
              <section className="w-60 max-sm:grow container">
                <Image
                  src={item?.headline?.image?.secure_url as string}
                  width={400}
                  height={400}
                  alt={item?.headline?.text as string}
                  className="h-44 rounded-badge min-w-60 object-cover _secondaryBg"
                />
                <Image
                  src={(casters[index] as StaticImageData) ?? casters[2]}
                  width={100}
                  height={100}
                  alt={item?.headline?.text as string}
                  className="h-5 w-auto object-contain my-2"
                />
                <p className="font-semibold line-clamp-2 h-11 max-w-full">
                  {item?.headline?.text as string}
                </p>
              </section>
            </Reveal>
          );
        })}
      </main>
    </div>
  );
};
