import { getDocs } from "../page";
import { IPageProps, IQueryResponse } from "@/types";
import { IDocFile } from "@/types/doc";
import { buildQueryStringServer } from "@/lib";
import InfiniteLimitScroller from "@/components/InfiniteScroll";
import { FaFilePdf } from "react-icons/fa6";
import { Color } from "@/styles";
import { formatDate, getTimeAgo } from "@/lib/timeAndDate";

const AllDocsPage = async ({ searchParams }: IPageProps) => {
  const qs = buildQueryStringServer(await searchParams);

  const docs: IQueryResponse<IDocFile[]> = await getDocs(qs);
  return (
    <div>
      {!docs?.data?.length ? (
        <p className="_label">No Documents available</p>
      ) : (
        <ul className="mb-6 space-y-2">
          {!docs?.data || (docs?.data?.length ?? 0) == 0 ? (
            <li className="_label"> No Documents available</li>
          ) : (
            docs?.data?.map((doc, index) => (
              <li
                key={index}
                className={`_card flex flex-wrap items-center gap-2 px-6 py-3 cursor-pointer active:bg-opacity-50 border-y border-border w-full before:h-6 before:w-1 before:-ml-5 hover:before:bg-primary active:before:scale-y-90 before:transition-all`}
              >
                <FaFilePdf color={Color.red} />
                <span>{doc?.name ?? doc?.original_filename}</span>
                <div className="flex flex-wrap gap-1 items-center justify-end ml-auto text-xs text-muted-foreground">
                  <span>{formatDate(doc?.createdAt, "March 2, 2025")}</span>
                  <span>{getTimeAgo(doc?.createdAt as string)}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
      <InfiniteLimitScroller pagination={docs?.pagination} />
    </div>
  );
};

export default AllDocsPage;
