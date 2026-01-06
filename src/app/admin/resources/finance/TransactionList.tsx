"use client";

import { PrimaryDropdown } from "@/components/Dropdown";
import { Pagination } from "@/components/pagination/Pagination";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/timeAndDate";
import { ITransaction } from "@/models/finance/types";
import { IPagination } from "@/types";
import { DIALOG } from "@/components/Dialog";
import TransactionForm from "./TransactionForm";
import { ConfirmActionButton } from "@/components/buttons/ConfirmAction";
import { shortText } from "@/lib";
import { apiConfig } from "@/lib/configs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/buttons/Button";

export default function TransactionList({
  transactions,
  pagination,
}: {
  transactions?: ITransaction[];
  pagination?: IPagination;
}) {
  if (transactions?.length === 0) {
    return (
      <Card className="p-12 border border-border bg-card text-center">
        <p className="text-muted-foreground">
          No transactions yet. Add one to get started!
        </p>
      </Card>
    );
  }

  return (
    <Card className="border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto max-h-[70vh] overflow-y-auto relative">
        <table className="w-full">
          <thead className="border-b border-border bg-muted sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Amount/Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Category
              </th>
              {/* <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                Amount
              </th> */}
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions?.map((transaction) => (
              <tr
                key={transaction?._id}
                className="hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-4 text-foreground ">
                  <div className="flex flex-col items-center justify-center">
                    <span
                      className={` text-lg font-semibold text-right ${
                        transaction?.type === "income"
                          ? "text-chart-4"
                          : "text-destructive"
                      }`}
                    >
                      {transaction?.type === "income" ? "+" : "-"}$
                      {transaction?.amount?.toFixed(2)}
                    </span>
                    <span className="text-nowrap text-xs font-light">
                      ({formatDate(transaction?.date, "March 2, 2025")})
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground ">
                  {transaction?.description}
                </td>
                <td className="px-6 py-4 text-sm">
                  <Badge
                    className={`px-2 p-1 rounded-full text-xs font-medium capitalize`}
                  >
                    {transaction?.category}
                  </Badge>
                </td>
                {/* <td
                 
                ></td> */}
                <td className="px-6 py-4 text-center">
                  <TransactionActions transaction={transaction} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination pagination={pagination} />
    </Card>
  );
}

function TransactionActions({ transaction }: { transaction: ITransaction }) {
  return (
    <PrimaryDropdown id={transaction?._id + "-mod"} className="space-y-2 p-2">
      <DIALOG
        trigger={
          <Button
            primaryText="Edit"
            className="text-primaryRed w-full text-left justify-start"
          />
        }
      >
        <TransactionForm
          transaction={{
            ...transaction,
            date: transaction?.date?.split("T")?.[0],
          }}
        />
      </DIALOG>

      <ConfirmActionButton
        primaryText="Delete Transaction"
        uri={`${apiConfig.transactions}/${transaction?._id}`}
        method={"DELETE"}
        variant="destructive"
        title={shortText(transaction?.description)}
        confirmText={`Are you sure you want to delete "<b>${shortText(
          transaction?.description,
          40
        )}</b>"?`}
        escapeOnEnd
      />
    </PrimaryDropdown>
  );
}
