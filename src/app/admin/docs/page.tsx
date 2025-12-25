import HEADER from "@/components/Element";
import { getPlayers } from "../players/page";
import {  IQueryResponse, IRecord, ISelectOptionLV } from "@/types";
import { IPlayer } from "@/app/players/page";
import { apiConfig } from "@/lib/configs";
import DocumentFolders from "./Folders";
import { DocumentUploader } from "./DocUploader";
import { ConsentForm } from "@/components/pdf/ConsentForm";
import { RecentDocs } from "./RecentDocs";
import { IFolder } from "@/types/doc";
interface IProps {
  searchParams: Promise<IRecord>;
}

export const getDocs = async (query?: string) => {
  const response = await fetch(`${apiConfig.docs}${query}`, {
    cache: "no-cache",
  });
  if (!response.ok) return null;
  return await response.json();
};


export const getFolderMetrics = async () => {
  const response = await fetch(`${apiConfig.docs}/metrics`, {
    cache: "no-cache",
  });
  if (!response.ok) return null;
  return await response.json();
};

export const getFolders = async (query?: string) => {
  const cleaned = query?.startsWith("?") ? query : `?${query}`;

  const response = await fetch(`${apiConfig.docs}/folders${cleaned}`, {
    cache: "no-cache",
  });
  if (!response.ok) return null;
  return await response.json();
};

export default async function DocsPage({ searchParams }: IProps) {
  const players: IQueryResponse<IPlayer[]> = await getPlayers();

  const folderMetrics: IQueryResponse<{
    folders: {
      docsCount: number;
      name: string;
      createdAt: string | Date;
      _id: string;
    }[];
    totalDocs: number;
  }> = await getFolderMetrics();

  const folders: IQueryResponse<IFolder[]> = await getFolders();

  console.log({ folderMetrics ,folders});

  return (
    <div className="px-4">
      <HEADER title="DOCUMENTATION " />
      <main className="_page px-3 mt-6 space-x-6 pb-6">
        <RecentDocs />

        <section>
          <DocumentUploader
            className="w-fit my-2"
            tagsData={[
              {
                name: "Tag Players",
                options: players?.data?.map((p) => ({
                  label: `${p.firstName} ${p?.lastName}`,
                  value: `${p?.firstName} ${p?.lastName}`,
                })) as ISelectOptionLV[],
              },
            ]}
        
          />
          <DocumentFolders folderMetrics={folderMetrics} />
        </section>

        <br />
        <section>
          <ConsentForm players={players?.data} />
        </section>
      </main>
    </div>
  );
}

export enum DocumentFolder {
  OTHERS = "others",
  // Player
  PLAYER_SIGNING_FORM = "player-signing-form",
  PLAYER_CONSENT_FORM = "player-consent-form",
  PLAYER_MEDICAL_RECORD = "player-medical-record",
  PLAYER_PROGRESS_REPORT = "player-progress-report",
  PLAYER_PERFORMANCE_STAT = "player-performance-stat",
  PLAYER_ID_COPY = "player-id-copy",
  PLAYER_PASSPORT = "player-passport",
  PLAYER_ACADEMIC_RECORD = "player-academic-record",

  // Team & Club
  CLUB_POLICY = "club-policy",
  CLUB_CONSTITUTION = "club-constitution",
  CLUB_PRESS_RELEASE = "club-press-release",

  // Match
  MATCH_REPORT = "match-report",
  MATCH_HIGHLIGHT = "match-highlight",
  MATCH_INJURY_REPORT = "match-injury-report",
  MATCH_PLAYER_RATING = "match-player-rating",

  // Admin
  ADMIN_MEETING_MINUTE = "admin-meeting-minute",
  ADMIN_EQUIPMENT_RECEIPT = "admin-equipment-receipt",
  ADMIN_OFFICIAL_LETTER = "admin-official-letter",

  // Media
  CLUB_LOGO = "club-logo",
  CLUB_BANNER_IMAGE = "club-banner-image",
  TEAM_PHOTO = "team-photo",
  SOCIAL_MEDIA_ASSET = "social-media-asset",

  // Medical
  INJURY_REPORT = "injury-report",
  MEDICAL_CLEARANCE = "medical-clearance",
  FITNESS_TEST = "fitness-test",
  PHYSIO_REPORT = "physio-report",

  // Guardian / Parent
  PARENT_ID_COPY = "parent-id-copy",
  PARENT_LETTER = "parent-letter",

  // Misc
  DONATION_RECEIPT = "donation-receipt",
  CLUB_SUPPORT_ITEM = "club-support-item",
  EQUIPMENT_INVENTORY = "equipment-inventory",
  EVENT_PERMISSION = "event-permission",
  TOURNAMENT_REGISTRATION = "tournament-registration",
}
