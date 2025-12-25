"use client";

import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { PrimaryDropdown } from "@/components/Dropdown";
import InfiniteLimitScroller from "@/components/InfiniteScroll";
import { apiConfig } from "@/lib/configs";
import { downloadFile } from "@/lib/downloadFile";
import { formatDate, getTimeAgo } from "@/lib/timeAndDate";
import { IDeleteFile, IFileProps, IQueryResponse } from "@/types";
import { Copy, Download, Move } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { DocMoveOrCopyTo } from "./MoveCopyTo";
import { DragAndDropUpload } from "../../../../components/DragAndDrop";
import { useAction } from "@/hooks/action";
import { useParams } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

interface IProps {
  docs?: IQueryResponse<IFileProps[]>;
}
export default function FolderDocuments({ docs }: IProps) {
  const docsFolder = useParams().folder;

  const { handleAction } = useAction();

  const isMobile=useIsMobile('sm')

  return (
    <div>
      <main className=" pb-7">
        <DragAndDropUpload
          onChange={(file) => {
            if (file)
              handleAction({
                uri: apiConfig.docs,
                method: "POST",
                body: {
                  file,
                  format: "pdf",
                  folder: docsFolder,
                },
              });
          }}
          fileType={"pdf"}
        >
          <ul className="flex items-start flex-wrap gap-3 border border-border/60 rounded-2xl p-5 grow">
            {docs?.data?.map((docFile, index) => {
              if(isMobile) return (
                <li
                  key={index}
                  className="group p-2 overflow-hidden hover:ring relative select-auto grow"
                >
                  <div className="flex items-center ">
                    <div className="relative pb-1">
                      <FaFilePdf className="text-Red" size={50} />
                    </div>

                    <div>
                      <p className="text-sm capitalize font-semibold line-clamp-2 ">
                        {(docFile.name ?? docFile?.original_filename)
                          ?.replaceAll("-", " ")
                          ?.replaceAll("_", " ")}
                      </p>

                      <div className="text-muted-foreground flex flex-wrap items-center ">
                        <span>
                          {formatDate(docFile.createdAt, "March 2, 2025")}
                        </span>
                        <span className="bg-secondary rounded-full px-1 text-xs">
                          ({getTimeAgo(docFile.createdAt as string)})
                        </span>
                      </div>
                    </div>
                  </div>
                  <DocumentActions document={docFile} />
                </li>
              );

              return(
              <li
                key={index}
                className="group p-2 overflow-hidden hover:ring relative select-auto "
              >
                <div className="w-32 flex flex-col justify-center items-center ">
                  <div className="relative pb-1">
                    <FaFilePdf className="text-Red" size={50} />
                  </div>
                  <span className="text-sm capitalize font-semibold text line-clamp-2 text-center">
                    {(docFile.name ?? docFile?.original_filename)
                      ?.replaceAll("-", " ")
                      ?.replaceAll("_", " ")}
                  </span>

                  <div className="text-muted-foreground flex flex-wrap items-center justify-center">
                    <span>
                      {formatDate(docFile.createdAt, "March 2, 2025")}
                    </span>
                    <span className="bg-secondary rounded-full px-1 text-xs">
                      ({getTimeAgo(docFile.createdAt as string)})
                    </span>
                  </div>
                </div>
                <DocumentActions document={docFile} />
              </li>
            )})}
          </ul>
        </DragAndDropUpload>

        <InfiniteLimitScroller
          pagination={docs?.pagination}
          endDataText="No more files"
        />
      </main>
    </div>
  );
}

export function DocumentActions({ document }: { document?: IFileProps }) {
  const className = `flex items-center gap-2 grow _hover _shrink p-2 text-sm`;
  const docName = document?.name ?? document?.original_filename;
  return (
    <div className=" right-0.5 top-1">
      <PrimaryDropdown
        id={document?._id}
        triggerStyles="absolute top-1 right-2 md:invisible group-hover:visible"
      >
        <ul>
          <li
            className={className}
            onClick={() => {
              downloadFile(document?.secure_url as string, docName as string);
            }}
          >
            <Download className="text-muted-foreground " /> Download
          </li>
          <li>
            <DocMoveOrCopyTo
              trigger={
                <div className={className}>
                  <Copy className="text-muted-foreground " size={24} /> Copy To
                </div>
              }
              actionType={"Copy"}
              document={document}
            />
          </li>
          <li>
            <DocMoveOrCopyTo
              trigger={
                <div className={className}>
                  <Move className="text-muted-foreground " size={24} /> Move To
                </div>
              }
              actionType={"Move"}
              document={document}
            />
          </li>
          <li>
            <ConfirmActionButton
              primaryText="Delete"
              trigger={
                <div className={`${className} `}>
                  <MdOutlineDelete size={24} /> Delete
                </div>
              }
              uri={`${apiConfig.docs}`}
              body={{
                files: [
                  {
                    public_id: document?.public_id,
                    resource_type: document?.resource_type,
                    _id: document?._id,
                  },
                ] as IDeleteFile[],
              }}
              method={"DELETE"}
              escapeOnEnd
              variant="destructive"
              title="Delete Document"
              confirmText={`Are you sure you want to delete ${docName}?`}
            />
          </li>
        </ul>
      </PrimaryDropdown>
    </div>
  );
}
