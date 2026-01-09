"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Filter, AlertTriangle, Plus } from "lucide-react";
import { useFetch } from "@/hooks/fetch";
import { IPlayer } from "@/types/player.interface";
import { PrimaryClearFiltersBtn } from "@/components/buttons/ClearFilters";
import SELECT from "@/components/select/Select";
import { CardsStats } from "./Stats";
import { PlayerDisplayPanel } from "../players/PlayerDisplay";
import { DIALOG } from "@/components/Dialog";
import { CardForm } from "./CardForm";
import { ECardType, ICard } from "@/types/card.interface";
import CardCard from "./CardCard";
import Loader from "@/components/loaders/Loader";

export function CardsManager() {
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Fetch all cards
  const { results: allCards, loading: isLoadingCards } = useFetch<ICard[]>({
    uri: "/cards",
    refetchOnRefresh: true,
  });

  // Get cards for selected player or all cards
  const playerCards = useMemo(() => {
    let cards = selectedPlayer
      ? allCards?.data?.filter(
          (card) => card?.player?._id === selectedPlayer._id
        )
      : allCards?.data;

    // Apply type filter
    if (typeFilter !== "all") {
      cards = cards?.filter((card) => card.type === typeFilter);
    }

    // Sort by date (newest first)
    return cards?.sort(
      (a, b) =>
        new Date(b?.createdAt as string).getTime() -
        new Date(a?.createdAt as string).getTime()
    );
  }, [allCards, selectedPlayer, typeFilter]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div />

        <DIALOG
          trigger={
            <>
              <Plus className="h-4 w-4 mr-2" />
              New Injury Report
            </>
          }
          variant={"default"}
        >
          <CardForm match={undefined} card={undefined} />
        </DIALOG>
      </div>

      <CardsStats cards={allCards} loading={isLoadingCards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Player List */}
        <PlayerDisplayPanel onSelect={(p) => setSelectedPlayer(p as IPlayer)} />
        {/* Right Panel: cards */}
        <Card className="lg:col-span-2">
          <header className="p-4 border-b">
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {selectedPlayer
                    ? `Cards - ${selectedPlayer.firstName} ${selectedPlayer.lastName}`
                    : "All Cards"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {playerCards?.length}
                  {playerCards?.length !== 1 ? " cards" : " injury"} found
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <Filter className="h-4 w-4" />
                  <span>Filter:</span>
                </div>

                <SELECT
                  options={[
                    { label: "🟨 Yellow ", value: ECardType.YELLOW },
                    { label: "🟥 Red ", value: ECardType.RED },
                  ]}
                  placeholder="type"
                  value={typeFilter}
                  onChange={(v) => setTypeFilter(v)}
                />

                {selectedPlayer && (
                  <PrimaryClearFiltersBtn
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPlayer(null)}
                    label="Clear Filter"
                  />
                )}
              </div>
            </div>
          </header>

          <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {isLoadingCards ? (
              <Loader />
            ) : playerCards?.length === 0 ? (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                <p className="text-muted-foreground">
                  {selectedPlayer
                    ? "No cards recorded"
                    : "No cards found"}
                </p>
                <DIALOG
                  trigger={
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Record a Card
                    </>
                  }
                  variant={"outline"}
                >
                  <CardForm player={selectedPlayer as IPlayer} />
                </DIALOG>
              </div>
            ) : (
              <div className="space-y-4">
                {playerCards?.map((card) => (
                  <CardCard
                    card={card}
                    key={card._id}
                    selectedPlayer={selectedPlayer as IPlayer}
                  />
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
