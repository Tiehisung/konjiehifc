import React, { FC } from "react";
import Header from "../../../../components/Element";
import { getNewsById } from "../page";
import { INewsProps } from "@/app/news/page";
import { EditNewsForm } from "./EditNewsForm";

interface IPageProps {
  searchParams: Promise<{ newsId: string }>;
}

export async function generateMetadata({ searchParams }: IPageProps) {
  const newsItem: INewsProps | null = await getNewsById(
    (
      await searchParams
    ).newsId
  );

  return {
    title: newsItem?.headline.text,
    description: newsItem?.headline.text,
    openGraph: {
      title: `${newsItem?.headline.text} – Konjiehi FC`,
      description: newsItem?.headline.text,
      images: [newsItem?.headline.image],
    },
  };
}

const NewsEditingPage: FC<IPageProps> = async ({ searchParams }) => {
  const newsId = (await searchParams).newsId;
  const newsItem: INewsProps = await getNewsById(newsId);

  return (
    <div>
      <Header title="Editing news" subtitle="" />

      <EditNewsForm newsItem={newsItem} />
    </div>
  );
};

export default NewsEditingPage;
