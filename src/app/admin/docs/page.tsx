import HEADER from "@/components/Element";
import { getPlayers } from "../players/page";
import { IQueryResponse, IRecord, ISelectOptionLV } from "@/types";
import { IPlayer } from "@/app/players/page";
import { apiConfig } from "@/lib/configs";
import DocumentFolders from "./Folders";
import { DocumentUploader } from "./DocUploader";
import { ConsentForm } from "@/components/pdf/ConsentForm";
import { RecentDocs } from "./RecentDocs";
import { IFolder } from "@/types/doc";
import TextDivider from "@/components/Divider";
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

  console.log({ folderMetrics, folders });

  return (
    <div>
      <HEADER title="DOCUMENTATION " />
      <main className="_page px-3 mt-6 space-x-6 pb-6">
        <RecentDocs />

        <section>
          <DocumentUploader
            className="w-full my-2"
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

        <TextDivider text="GENERATE CONSENT FORMS" className="text-Orange my-6" />

        <ConsentForm players={players?.data} />
      </main>
    </div>
  );
}
