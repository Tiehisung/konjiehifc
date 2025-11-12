import React from "react";
import ClientFinance from "./ClientFinance";
import { apiConfig } from "@/lib/configs";
import { buildQueryStringServer } from "@/lib";
import { IQueryResponse } from "@/types";
import { IFinancialSummary, ITransaction } from "@/models/finance/types";

export const getTransactions = async (query?: string) => {
  try {
    const uri = query
      ? `${apiConfig.transactions}${query}`
      : apiConfig.transactions;

    const response = await fetch(uri, { cache: "no-cache" });
    return await response.json();
  } catch {
    return null;
  }
};

export const getTransactionById = async (id: string) => {
  try {
    const response = await fetch(`${apiConfig.transactions}/${id}`, {
      cache: "no-store",
    });

    return await response.json();
  } catch {
    return null;
  }
};

interface IPageProps {
  searchParams: Promise<
    Record<string, string | string[] | boolean | undefined>
  >;
}
const FinancePage = async ({ searchParams }: IPageProps) => {
  const qs = buildQueryStringServer(await searchParams);

  const transactionsData: IQueryResponse<{
    transactions: ITransaction[];
    financialSummary: IFinancialSummary;
  }> = await getTransactions(qs);

  console.log({ transactionsData });
  return (
    <div>
      <ClientFinance transactionsData={transactionsData} />
    </div>
  );
};

export default FinancePage;
