"use client";

import InfiniteLimitScroller from "@/components/InfiniteScroll";
import { apiConfig } from "@/lib/configs";
import { formatDate, getTimeAgo } from "@/lib/timeAndDate";
import { IQueryResponse } from "@/types";
import { FaFilePdf } from "react-icons/fa";
import { DragAndDropUpload } from "../../../../components/DragAndDrop";
import { useAction } from "@/hooks/action";
import { useParams } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { IDocFile } from "@/types/doc";
import { DocumentActions } from "./Actions";

interface IProps {
  docs?: IQueryResponse<IDocFile[]>;
}
export default function FolderDocuments({ docs }: IProps) {
  const docsFolder = useParams().folder;

  const { handleAction } = useAction();

  const isMobile = useIsMobile("sm");

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
              if (isMobile)
                return (
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

              return (
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
              );
            })}
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


