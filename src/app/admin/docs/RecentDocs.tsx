import TextDivider from "@/components/Divider";
import { Color } from "@/styles";
import { FaFilePdf } from "react-icons/fa";
import { IFileProps, IQueryResponse } from "@/types";
import Loader from "@/components/loaders/Loader";
import { getDocs } from "./page";

export async function RecentDocs() {
  const recentDocs: IQueryResponse<IFileProps[]> = await getDocs("?limit=10");
  console.log({ recentDocs });
  return (
    <div>
      <header className=" items-center justify-between mb-4">
        <TextDivider
          text="RECENT DOCUMENTS"
          className="text-xs font-light grow"
        />
      </header>
      <main>
        <br />

        {!recentDocs ? (
          <Loader />
        ) : (
          <ul className="mb-6 space-y-2">
            {!recentDocs?.data || (recentDocs?.data?.length ?? 0) == 0 ? (
              <li className="_label"> No Documents available</li>
            ) : (
              recentDocs?.data?.map((doc, index) => (
                <li
                  key={index}
                  className={`_card flex items-center gap-2 px-6 py-3 cursor-pointer active:bg-opacity-50 border-y border-border w-full before:h-6 before:w-1 before:-ml-5 hover:before:bg-primary active:before:scale-y-90 before:transition-all`}
                >
                  <FaFilePdf color={Color.red} />
                  <span>{doc?.name ?? doc?.original_filename}</span>
                </li>
              ))
            )}
          </ul>
        )}
      </main>
      <br />
    </div>
  );
}
