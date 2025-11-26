"use client";

import { usePathname, useRouter } from "next/navigation";
import { DocumentFolder } from "./page";
import { PiFolderPlusLight } from "react-icons/pi";

export default function DocumentFolders() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div>
      <main className="flex items-start gap-4 ">
        <ul className="flex items-start flex-wrap gap-3 border rounded-2xl p-5">
          {Object.values(DocumentFolder).map((f, index) => (
            <li
              key={index}
              className="p-2 _hover relative select-auto "
              onClick={() => router.push(`${pathname}/${f}`)}
            >
              <div className="w-32 flex flex-col justify-center items-center ">
                <div className="relative pb-1">
                  <PiFolderPlusLight
                    className="text-primary dark:text-Orange"
                    size={100}
                  />
                  <span className="absolute bottom-3 left-1 bg-secondary rounded-full px-1">45</span>
                </div>
                <span className="text-sm capitalize font-semibold text line-clamp-1 text-center">
                  {f.replaceAll("-", " ")}
                </span>
                <p className="text-muted-foreground">Date</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
