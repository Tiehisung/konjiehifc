import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EPlayerAvailability, IPlayer } from "@/types/player.interface";
import { PlayerHeader } from "./Header";
import { PlayerInjuryAndIssues } from "./InjuryAndIssues";
import { PerformanceTabs } from "./Performance";
import { PlayerSidebar } from "./Sidebar";
import { StatsCards } from "./Stats";
import { PositionVisualization } from "./PositionVisualization";
import { IPageProps, IQueryResponse } from "@/types";
import { auth } from "@/auth";
import { getPlayerById } from "@/app/admin/players/page";
import { IGallery } from "@/types/file.interface";
import { getGallery } from "@/app/admin/galleries/page";
import { Metadata } from "next";
import { kfc } from "@/data/kfc";
import { PlayerGalleries } from "./Galleries";
import { PrimaryTabs } from "@/components/Tabs";
import { enumToOptions } from "@/lib/select";
import { TABS } from "@/components/ui/tabs";

// Mock data - replace with actual API call
export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const session = await auth();

  const player: IPlayer = await getPlayerById(session?.user?.email as string);

  if (!player) {
    return {
      title: "Player dashboard | Konjiehi FC",
      description: "  Konjiehi FC player dashboard",
    };
  }

  const title = `${player?.lastName} | Konjiehi FC`;
  const description = player?.about || "player dashboard from Konjiehi FC.";

  const image = player?.avatar || kfc.logo;
  const url = `${kfc.url}/players/dashboard`;

  const ogImage = image.replace(
    "/upload/",
    "/upload/c_fill,w_1200,h_630,f_auto,q_auto/"
  );

  console.log({ ogImage, url, title, description });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: kfc.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: player?.firstName,
        },
        {
          url: image,
          width: 1200,
          height: 630,
          alt: player?.firstName,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage, image],
    },
  };
}

export default async function PlayerPage({ searchParams }: IPageProps) {
  const session = await auth();

  const player: IPlayer = await getPlayerById(session?.user?.email as string);
  const galleries: IQueryResponse<IGallery[]> = await getGallery(
    `?tags=${[player?._id].filter(Boolean).join(",")}&limit=3`
  );

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

            <PlayerInjuryAndIssues player={player} />

            <PerformanceTabs player={player} />

            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About Player</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {player?.about || "No description available."}
                </p>
              </CardContent>
            </Card>

            {/* Gallery Section */}
            <PlayerGalleries player={player} />
          </div>
        </div>
      </div>
      <PrimaryTabs tabs={enumToOptions(EPlayerAvailability)}>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
      </PrimaryTabs>
       
      <TABS tabs={enumToOptions(EPlayerAvailability)} >
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
      </TABS>
      
    </div>
  );
}
