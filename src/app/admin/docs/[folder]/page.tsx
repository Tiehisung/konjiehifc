import { IFileProps, IQueryResponse, IRecord, ISelectOptionLV } from "@/types";
import { DocumentFolder, getDocsByFolder } from "../page";
import { buildQueryStringServer } from "@/lib";
import FolderDocuments from "./DocsPane";
import { DocumentUploader } from "../DocUploader";
import { Badge } from "@/components/ui/badge";
import { getPlayers } from "../../players/page";
import { IPlayer } from "@/app/players/page";
import { PrimarySearch } from "@/components/Search";

interface IProps {
  params: Promise<{ folder: string }>;
  searchParams: Promise<IRecord>;
}
export default async function FolderPage({ searchParams, params }: IProps) {
  const qs = buildQueryStringServer(await searchParams);
  const docs: IQueryResponse<IFileProps[]> = await getDocsByFolder(
    (
      await params
    ).folder as DocumentFolder,
    qs
  );
  const players: IQueryResponse<IPlayer[]> = await getPlayers();
  const folder = (await params).folder;

  return (
    <div className="_page px-4">
      <header className="flex items-center justify-between gap-4">
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
          defaultFolder={folder}
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
        placeholder={`Search ${folder.replaceAll("-", " ")}`}
        inputStyles="h-8 placeholder:capitalize"
        className="mb-4"
      />

      <FolderDocuments docs={docs} />
    </div>
  );
}
