"use client";

import { usePathname, useRouter } from "next/navigation";
import { DocumentFolder } from "./page";
import { PiFolderPlusLight } from "react-icons/pi";
import { IQueryResponse } from "@/types";
import { Badge } from "@/components/ui/badge";

export default function DocumentFolders({
  folderMetrics,
}: {
  folderMetrics?: IQueryResponse<{
    folders: { count: number; folder: string }[];
    totalDocs: number;
  }>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <main className="flex items-start gap-4 ">
        <ul className="grid grid-cols-2 sm:flex items-start flex-wrap gap-3 border rounded-2xl p-5">
          {Object.values(DocumentFolder).map((f, index) => {
            const folder = folderMetrics?.data?.folders?.find(
              (d) => d.folder == f
            );
            return (
              <li
                key={index}
                className="p-2 _hover relative select-auto w-32"
                onClick={() => router.push(`${pathname}/${f}`)}
              >
                <div className=" flex flex-col justify-center items-center ">
                  <div className="relative pb-1">
                    <PiFolderPlusLight className="text-primary text-7xl lg:text-8xl dark:text-Orange" />
                    <Badge
                      variant={"secondary"}
                      className="absolute bottom-4 left-2 text-muted-foreground"
                    >
                      {folder?.count ?? 0}
                    </Badge>
                  </div>
                  <span className="text-sm capitalize font-semibold text line-clamp-2 text-center">
                    {f?.replaceAll("-", " ")}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
