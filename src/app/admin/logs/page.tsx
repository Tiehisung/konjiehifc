import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IAccordionProps, PrimaryAccordion } from "@/components/Accordion";
import { PrimarySearch } from "@/components/input/Search";
import { Pagination } from "@/components/Pagination";
import { shortText } from "@/lib";
import { buildQueryString } from "@/lib/params";
import { getFormattedDate, timeAgo } from "@/lib/time";
import { apiConfig } from "@/lib/url-config";
import { ILog, IPagination, IQueryResponse, IUser } from "@/types";
import { getServerSession } from "next-auth";

export const getLogs = async (queryString?: string) => {
  try {
    const url =   `${apiConfig.base}/logs${queryString || ""}`  

    const response = await fetch(url, {
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
};

interface IPageProps {
  searchParams: Promise<{
    displayType: "box" | "list";
    page?: string;
    limit?: string;
    search?: string;
    type?: string;
  }>;
}
export default async function LogsPage({searchParams}:IPageProps) {
   const qs = buildQueryString(await searchParams);
  const logs = (await getLogs(qs)) as IQueryResponse<ILog[]>;
  
  const accordionData = logs?.data?.map((log) => ({
    trigger: (
      <div className="flex justify-between gap-5 items-start grow ">
        <p className=" _subtitle cursor-pointer ">{shortText(log.title, 50)}</p>
        <span className="font-light">{timeAgo(log.createdAt.toString())}</span>
      </div>
    ),
    content: (
      <div className="space-y-2 border-b pb-6">
        <p>
          <span className="_label mr-1.5 text-muted-foreground ">
            Description:
          </span>
          {log.description}
        </p>

        <p>
          <span className="_label mr-1.5 text-muted-foreground ">
            Severity:
          </span>
          {log.severity}
        </p>

        <p>
          <span className="_label mr-1.5 text-muted-foreground ">
            Category:
          </span>
          {log.category}
        </p>

        <p>
          <span className="_label mr-1.5 text-muted-foreground ">Source:</span>
          {log.source}
        </p>

        <p>
          <span className="_label mr-1.5 text-muted-foreground ">
            Created At:
          </span>
          {getFormattedDate(log.createdAt.toString(), "March 2, 2025")},
          {timeAgo(log.createdAt.toString())}
        </p>

        <p>
          <span className="_label mr-1.5 text-muted-foreground ">
            Action By:
          </span>
          {(log?.user as IUser)?.name}
        </p>
      </div>
    ),
    value: log._id,
  }));
  const session = await getServerSession(authOptions)

  // console.log('session',session)
 
  return (
    <div>
      <header className=" space-y-5 mb-4">
        <div className="text-lg md:text-xl xl:text-3xl font-semibold"> System Logs</div>
         <PrimarySearch placeholder='Search Logs' inputStyles="h-9"/>
      </header>
      <PrimaryAccordion data={accordionData as IAccordionProps["data"]} />

       <Pagination pagination={logs?.pagination as IPagination} />
    </div>
  );
}
