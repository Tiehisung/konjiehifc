// app/admin/injuries/page.tsx or components/admin/injuries-manager.tsx
"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  User,
  AlertTriangle,
  AlertCircle,
  AlertOctagon,
  X,
  Plus,
  Calendar,
  Edit,
} from "lucide-react";
import { useFetch } from "@/hooks/fetch";
import { IPlayer } from "@/types/player.interface";
import { EInjurySeverity, IInjury } from "@/types/injury.interface";
import { formatDate } from "@/lib/timeAndDate";
import { PrimaryClearFiltersBtn } from "@/components/buttons/ClearFilters";
import SELECT from "@/components/select/Select";
import { enumToOptions } from "@/lib/select";
import { InjuryStats } from "./Stats";
import { PlayerDisplayPanel } from "../players/PlayerDisplay";
import { InjuryForm } from "./InjuryForm";
import { DIALOG } from "@/components/Dialog";
import { ConfirmDialog } from "@/components/Confirm-dialog";

export function InjuriesManager() {
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  // Fetch all injuries
  const { results: allInjuries, loading: isLoadingInjuries } = useFetch<
    IInjury[]
  >({
    uri: "/injuries",
    refetchOnRefresh: true,
  });

  // Get injuries for selected player or all injuries
  const playerInjuries = useMemo(() => {
    let injuries = selectedPlayer
      ? allInjuries?.data?.filter(
          (injury) => injury.player._id === selectedPlayer._id
        )
      : allInjuries?.data;

    // Apply severity filter
    if (severityFilter !== "all") {
      injuries = injuries?.filter(
        (injury) => injury.severity === severityFilter
      );
    }

    // Sort by date (newest first)
    return injuries?.sort(
      (a, b) =>
        new Date(b?.createdAt as string).getTime() -
        new Date(a?.createdAt as string).getTime()
    );
  }, [allInjuries, selectedPlayer, severityFilter]);

  // Severity badge component
  const SeverityBadge = ({ severity }: { severity: string }) => {
    const config = {
      MINOR: {
        label: "Minor",
        className: "bg-green-100 text-green-800 hover:bg-green-100",
        icon: <AlertCircle className="h-3 w-3" />,
      },
      MODERATE: {
        label: "Moderate",
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
        icon: <AlertTriangle className="h-3 w-3" />,
      },
      MAJOR: {
        label: "Major",
        className: "bg-orange-100 text-orange-800 hover:bg-orange-100",
        icon: <AlertTriangle className="h-3 w-3" />,
      },
      SEVERE: {
        label: "Severe",
        className: "bg-red-100 text-red-800 hover:bg-red-100",
        icon: <AlertOctagon className="h-3 w-3" />,
      },
    };

    const { label, className, icon } =
      config[severity as keyof typeof config] || config.MINOR;

    return (
      <Badge variant="outline" className={`gap-1 ${className}`}>
        {icon}
        {label}
      </Badge>
    );
  };

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
          <InjuryForm match={undefined} injury={undefined} />
        </DIALOG>
      </div>
      <InjuryStats injuries={allInjuries} loading={isLoadingInjuries} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Player List */}
        <PlayerDisplayPanel onSelect={(p) => setSelectedPlayer(p as IPlayer)} />
        {/* Right Panel: Injuries */}
        <Card className="lg:col-span-2">
          <div className="p-4 border-b">
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {selectedPlayer
                    ? `Injuries - ${selectedPlayer.firstName} ${selectedPlayer.lastName}`
                    : "All Injuries"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {playerInjuries?.length}
                  {playerInjuries?.length !== 1 ? " injuries" : " injury"} found
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <Filter className="h-4 w-4" />
                  <span>Filter:</span>
                </div>

                <SELECT
                  options={enumToOptions(EInjurySeverity)}
                  placeholder="Severity"
                  value={severityFilter}
                  onChange={(v) => setSeverityFilter(v)}
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
          </div>

          <div className="p-4 max-h-[calc(100vh-300px)] overflow-y-auto">
            {isLoadingInjuries ? (
              <div className="text-center py-8">Loading injuries...</div>
            ) : playerInjuries?.length === 0 ? (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                <p className="text-muted-foreground">
                  {selectedPlayer
                    ? "No injuries recorded for this player"
                    : "No injuries found"}
                </p>
                <DIALOG
                  trigger={
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Report First Injury
                    </>
                  }
                  variant={"outline"}
                >
                  <InjuryForm player={selectedPlayer as IPlayer} />
                </DIALOG>
              </div>
            ) : (
              <div className="space-y-4">
                {playerInjuries?.map((injury) => (
                  <Card key={injury._id} className="overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <SeverityBadge severity={injury.severity} />
                            <span className="text-sm text-muted-foreground">
                              {formatDate(injury.createdAt)}
                              {injury.minute && ` • Minute ${injury.minute}`}
                            </span>
                          </div>

                          <h3 className="font-semibold text-lg mb-2">
                            {injury.title}
                          </h3>

                          <p className="text-muted-foreground mb-3">
                            {injury.description}
                          </p>

                          <div className="flex items-center gap-4 text-sm">
                            {!selectedPlayer && (
                              <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                                  {injury.player.avatar ? (
                                    <img
                                      src={injury.player.avatar}
                                      alt={injury.player.name}
                                      className="h-6 w-6 rounded-full object-cover"
                                    />
                                  ) : (
                                    <User className="h-3 w-3" />
                                  )}
                                </div>
                                <span className="font-medium">
                                  {injury.player.name}
                                </span>
                                <span className="text-muted-foreground">
                                  #{injury.player.number}
                                </span>
                              </div>
                            )}

                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                Reported {formatDate(injury.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <DIALOG
                            trigger={"Edit"}
                            variant={"outline"}
                            triggerStyles="text-sm p-1.5 px-2"
                          >
                            <InjuryForm match={undefined} injury={injury} />
                          </DIALOG>

                          <ConfirmDialog
                            description="Delete injury to resolve"
                            action={{
                              method: "DELETE",
                              uri: `/injuries/${injury._id}`,
                            }}
                            trigger="Resolve"
                            variant={"destructive"}
                            title={injury.title}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
