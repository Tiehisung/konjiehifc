import HEADER from "@/components/Element";
import { buildQueryStringServer } from "@/lib";
import { apiConfig } from "@/lib/configs";
import BackToTopButton from "@/components/scroll/ToTop";
import { CardsManager } from "./CardsManager";
import { IQueryResponse } from "@/types";
import { ICard } from "@/types/card.interface";

export const getCards = async (queryString?: string) => {
  try {
    const url = `${apiConfig.base}/cards${queryString || ""}`;

    const response = await fetch(url, {
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
};

interface IPageProps {
  searchParams: Promise<{
    displayType: "box" | "list";
    page?: string;
    limit?: string;
    search?: string;
    type?: string;
  }>;
}

export default async function CardsPage({ searchParams }: IPageProps) {
  const qs = buildQueryStringServer(await searchParams);

  const cards: IQueryResponse<ICard[]> = await getCards(qs);

  return (
    <div>
      <HEADER
        title="Cards Management"
        subtitle="Track and manage player cards"
      />

      <div className="_page ">
        <CardsManager cardsData={cards} />
      </div>

      <BackToTopButton />
    </div>
  );
}
