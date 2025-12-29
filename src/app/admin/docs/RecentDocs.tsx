import TextDivider from "@/components/Divider";
import { Color } from "@/styles";
import { FaFilePdf } from "react-icons/fa";
import { IQueryResponse } from "@/types";
import Loader from "@/components/loaders/Loader";
import { getTimeAgo } from "@/lib/timeAndDate";
import { getDocs } from "./page";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FileViewer from "@/components/FilePreviewModal";
import { DocumentActions } from "./[folder]/Actions";
import { IDocFile } from "@/types/doc";
import { shortText } from "@/lib";

export async function RecentDocs() {
  const recentDocs: IQueryResponse<IDocFile[]> = await getDocs("?limit=5");

  return (
    <div>
      <header className=" items-center justify-between mb-4">
        <TextDivider
          text="RECENT DOCUMENTS"
          className="text-xs font-light grow"
        />
      </header>
      <main>
        {!recentDocs ? (
          <Loader />
        ) : (
          <ul className="mb-6 space-y-2 divide-y">
            {!recentDocs?.data || (recentDocs?.data?.length ?? 0) == 0 ? (
              <li className="_label"> No Documents available</li>
            ) : (
              recentDocs?.data?.map((doc, index) => (
                <li
                  key={index}
                  className={`group relative flex justify-between items-center gap-2 px-3 py-3 cursor-pointer active:bg-opacity-50 w-full before:h-6 before:w-1 before:-ml-5 hover:before:bg-primary active:before:scale-y-90 before:transition-all`}
                >
                  <FileViewer
                    url={doc?.secure_url}
                    title={doc?.description as string}
                    trigger={
                      <div className="grid">
                        <p className="flex items-center gap-2.5 line-clamp-1 grow _wordBreak ">
                          <FaFilePdf color={Color.red} />
                          <span className="sm:hidden">
                            {shortText(
                              doc?.name ?? (doc?.original_filename as string),
                              30
                            )}
                          </span>
                          <span className="max-sm:hidden">
                            {shortText(
                              doc?.name ?? (doc?.original_filename as string),
                              50
                            )}
                          </span>
                        </p>
                        <p className="font-light text-sm text-left ml-3 ">
                          {getTimeAgo(doc?.createdAt as string)}
                        </p>
                      </div>
                    }
                    className="px-1"
                  />

                  <DocumentActions document={doc} className="md:visible relative" />
                </li>
              ))
            )}
            <li className="py-6">
              <Link
                href={"/admin/docs/files"}
                className="_link border rounded-full py-2 px-5 flex items-center justify-between gap-3"
              >
                View More <ChevronRight />
              </Link>
            </li>
          </ul>
        )}
      </main>
      <br />
    </div>
  );
}
