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
import { IPageProps } from "@/types";

// Mock data - replace with actual API call
const mockPlayer: IPlayer = {
  _id: "1",
  slug: "john-doe-10",
  number: "10",
  about:
    "Talented attacking midfielder with excellent vision and passing ability.",
  description: "Key playmaker and team leader with 5 years of experience.",
  medicals: [{ fitness: "Full training" }, { fitness: "No issues" }],
  galleries: [],
  isFit: true,
  isActive: true,
  issues: [],
  injuries: ["Ankle sprain (2023)", "Hamstring strain (2022)"],
  captaincy: "Vice Captain",
  firstName: "John",
  lastName: "Doe",
  dateSigned: "2022-01-15",
  phone: "+1234567890",
  email: "john.doe@team.com",
  dob: "1995-06-15",
  height: 182,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  manager: {
      _id: "m1",
      fullname: "Alex Manager",
      email: "alex@team.com",
      phone: "+0987654321",
      dob: "",
      avatar: "",
      role: "",
      dateSigned: "",
      startDate: "",
      endDate: "",
      createdAt: "",
      updatedAt: ""
  },
  position: "attacking midfielder" as any, // Using ATTACKING_MIDFIELDER
  favColor: EColor.BLUE,
  goals: Array.from({ length: 15 }, (_, i) => ({
    _id: `g${i}`,
    matchId: `m${i}`,
    minute: Math.floor(Math.random() * 90) + 1,
    type: "open play",
  })),
  matches: Array.from({ length: 20 }, (_, i) => ({
    _id: `m${i}`,
    date: `2023-${String((i % 12) + 1).padStart(2, "0")}-${String(
      (i % 28) + 1
    ).padStart(2, "0")}`,
    opponent: `Team ${i + 1}`,
    competition: i % 3 === 0 ? "League" : i % 3 === 1 ? "Cup" : "Friendly",
    result: i % 2 === 0 ? "W 2-1" : "D 1-1",
  })),
  ratings: Array.from({ length: 20 }, (_, i) => ({
    rating: 7.5 + Math.random() * 2,
    match: `m${i}`,
  })),
  assists: Array.from({ length: 8 }, (_, i) => ({
    _id: `a${i}`,
    matchId: `m${i}`,
    minute: Math.floor(Math.random() * 90) + 1,
    type: "through ball",
  })),
  mvp: Array.from({ length: 3 }, (_, i) => ({
    _id: `mvp${i}`,
    match: {
      _id: `m${i}`,
      date: "2023-10-15",
      opponent: "Team A",
      competition: "League",
      result: "W 3-0",
    },
  })),
  passAcc: "89%",
  trophies: 2,
  cards: [
    { _id: "c1", matchId: "m1", type: "yellow", minute: 45 },
    { _id: "c2", matchId: "m3", type: "yellow", minute: 67 },
  ],
  training: { team: "A" },
  status: "approved",
};

export default async function PlayerPage({ params }: IPageProps) {
    const playerSlug = (await params).playerId
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <PlayerHeader player={mockPlayer} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <PlayerSidebar player={mockPlayer} />
            <PositionVisualization player={mockPlayer} />
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-8">
            <StatsCards player={mockPlayer} />

            <MedicalInfo player={mockPlayer} />

            <PerformanceTabs player={mockPlayer} />

            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About Player</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {mockPlayer.about || "No description available."}
                </p>
              </CardContent>
            </Card>

            {/* Gallery Section */}
            <GalleryGrid player={mockPlayer} />
          </div>
        </div>
      </div>
    </div>
  );
}
