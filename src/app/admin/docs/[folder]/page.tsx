import { IFileProps, IQueryResponse, IRecord, ISelectOptionLV } from "@/types";
import { buildQueryStringServer } from "@/lib";
import FolderDocuments from "./DocsPane";
import { DocumentUploader } from "../DocUploader";
import { Badge } from "@/components/ui/badge";
import { getPlayers } from "../../players/page";
import { IPlayer } from "@/types/player.interface";
import { PrimarySearch } from "@/components/Search";
import { apiConfig } from "@/lib/configs";
import { IDocFile } from "@/types/doc";

interface IProps {
  params: Promise<{ folder: string }>;
  searchParams: Promise<IRecord>;
}

export const getDocsByFolderName = async (
  folderName: string,
  query?: string
) => {
  const response = await fetch(`${apiConfig.docs}/${folderName}${query}`, {
    cache: "no-cache",
  });
  if (!response.ok) return null;
  return await response.json();
};

export default async function FolderPage({ searchParams, params }: IProps) {
  const qs = buildQueryStringServer(await searchParams);
  const folderName = decodeURIComponent((await params).folder);

  const docs: IQueryResponse<IDocFile[]> = await getDocsByFolderName(
    folderName,
    qs
  );
  const players: IQueryResponse<IPlayer[]> = await getPlayers();

  return (
    <div className="_page px-4">
      <header className="flex items-center justify-between gap-4 my-3.5">
        <DocumentUploader
          className="w-fit my-2"
          tagsData={[
            {
              name: "Players",
              options: players?.data?.map((p) => ({
                label: `${p.firstName} ${p?.lastName}`,
                value: `${p?.firstName} ${p?.lastName}`,
              })) as ISelectOptionLV[],
            },
          ]}
          defaultFolder={folderName}
        />
        <div className="flex items-center text-sm gap-0.5">
          <span>{docs?.pagination?.page}</span> of
          <span>{docs?.pagination?.pages}</span>
          <Badge>{docs?.pagination?.total}</Badge>
        </div>
      </header>
      <PrimarySearch
        type="search"
        datalist={(players?.data ?? [])?.map(
          (p) => `${p?.firstName} ${p?.lastName}`
        )}
        listId="docs-search"
        searchKey="doc_search"
        placeholder={`Search ${folderName?.replaceAll("-", " ")}`}
        inputStyles="h-8 placeholder:capitalize"
        className="mb-4"
      />

      <FolderDocuments docs={docs} />
    </div>
  );
}
