"use client";

import { usePathname, useRouter } from "next/navigation";
import { IQueryResponse } from "@/types";
import { FolderForm } from "./FolderForm";
import { Folder } from "lucide-react";
import Link from "next/link";

export default function DocumentFolders({
  folderMetrics,
}: {
  folderMetrics?: IQueryResponse<{
    folders: {
      docsCount: number;
      name: string;
      createdAt: string | Date;
      _id: string;
    }[];
    totalDocs: number;
  }>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <main className="flex items-start gap-4 ">
        <ul className="grid grid-cols-2 sm:flex items-start flex-wrap gap-3 border rounded-2xl p-5">
          {folderMetrics?.data?.folders?.map((f, index) => {
            return (
              <li
                key={index}
                className="flex _hover relative select-auto w-32"
              >
                <Link href={`${pathname}/${f.name}`} className="flex grow p-2">
                  <div className=" flex flex-col justify-center items-center ">
                    <Folder
                      className="text-Orange/80 text-7xl lg:text-8xl dark:text-Orange"
                      size={44}
                    />
                    <span className="font-light text-sm text-muted-foreground mx-auto">
                      {f?.docsCount ?? 0} items
                    </span>

                    <span className="text-sm capitalize font-semibold text line-clamp-2 text-center">
                      {f?.name}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
          <li>
            <FolderForm />
          </li>
        </ul>
      </main>
    </div>
  );
}
