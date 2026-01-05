import GalleryGrid from "@/components/Gallery/GallaryGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPlayer } from "@/types/player.interface";
import { PlayerHeader } from "./Header";
import { MedicalInfo } from "./Medical";
import { PerformanceTabs } from "./Performance";
import { PlayerSidebar } from "./Sidebar";
import { StatsCards } from "./Stats";
import { EColor } from "@/types/log";
import { PositionVisualization } from "./PositionVisualization";
import { IPageProps, IQueryResponse } from "@/types";
import { auth } from "@/auth";
import { getPlayerById, getPlayers } from "@/app/admin/players/page";

// Mock data - replace with actual API call

export default async function PlayerPage({ searchParams }: IPageProps) {
  const session = await auth();

  const player: IPlayer = await getPlayerById(session?.user?.email as string);

  console.log("player", player);
  return (
    <div className="min-h-screen bg-accent p-4 md:p-8 pt-20 md:pt-20 ">
      <div className="max-w-7xl mx-auto">
        <PlayerHeader player={player} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <PlayerSidebar player={player} />
            <PositionVisualization player={player} />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            <StatsCards player={player} />

            <MedicalInfo player={player} />

            <PerformanceTabs player={player} />

            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About Player</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {player.about || "No description available."}
                </p>
              </CardContent>
            </Card>

            {/* Gallery Section */}
            {/* <GalleryGrid player={mockPlayer} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
