"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Card } from "@/components/ui/card";
import {
  ExpenseCategory,
  IncomeCategory,
  ITransaction,
  TransactionType,
} from "@/models/finance/types";
import { INPUT } from "@/components/input/input";
import { PrimarySelect } from "@/components/select/Select";
import { Label } from "@/components/ui/label";
import { DateTimeInput } from "@/components/input/Inputs";
import { Button } from "@/components/buttons/Button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiConfig } from "@/lib/configs";
import { shortText } from "@/lib";
import { useSession } from "next-auth/react";
import { fireEscape } from "@/hooks/Esc";

const CATEGORIES = {
  income: Object.keys(IncomeCategory).map((k) => ({
    label: k,
    value: IncomeCategory[k as keyof typeof IncomeCategory],
  })),
  expense: Object.keys(ExpenseCategory).map((k) => ({
    label: k,
    value: ExpenseCategory[k as keyof typeof ExpenseCategory],
  })),
};

// Joi validation schema
const transactionSchema = Joi.object({
  type: Joi.string()
    .valid(...Object.values(TransactionType))
    .required(),
  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be positive",
    "any.required": "Amount is required",
  }),
  category: Joi.string()
    .valid(...Object.values(IncomeCategory), ...Object.values(ExpenseCategory))
    .required(),
  description: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Description is required",
  }),
  date: Joi.date()
    .max("now") //  prevents any date after current time
    .required()
    .messages({
      "date.base": "Invalid date format",
      "date.max": "Date cannot be in the future",
      "any.required": "Date is required",
    }),
});

type TransactionFormData = {
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};

interface TransactionFormProps {
  transaction?: ITransaction;
}

export default function TransactionForm({ transaction }: TransactionFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const session = useSession();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<TransactionFormData>({
    resolver: joiResolver(transactionSchema, { allowUnknown: true }),
    defaultValues: {
      type: IncomeCategory.DONATIONS,
      amount: 0,
      category: ExpenseCategory.EQUIPMENT,
      description: "",
      date: new Date().toISOString().split("T")[0],
      ...transaction,
    } as TransactionFormData,
  });

  const currentType = watch("type");

  const onSubmit = async (data: TransactionFormData) => {
    console.log({ data });

    try {
      setIsLoading(true);
      const response = await fetch(
        apiConfig.transactions + (transaction ? `/${transaction._id}` : ""),
        {
          method: transaction ? "PUT" : "POST",
          body: JSON.stringify({ ...data, user: session?.data?.user }),
          headers: { "content-type": "application/json" },
        }
      );
      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        reset({
          type,
          amount: 0,
          category: type === "income" ? "Salary" : "Food",
          description: "",
          date: new Date().toISOString().split("T")[0],
        });
        if (transaction) {
          fireEscape();
        }
      } else toast(result.message);
    } catch {
      toast.error("Failed to save!");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <Card className="p-6 border border-border bg-card">
      <h2 className="text-xl font-bold text-foreground mb-6">
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Type Selection */}
        <div className="flex gap-3">
          {["income", "expense"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setType(t as TransactionType);
                setValue("type", t as "income" | "expense");
                setValue(
                  "category",
                  t === "income"
                    ? IncomeCategory.DONATIONS
                    : ExpenseCategory.EQUIPMENT
                );
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors uppercase ${
                type === t
                  ? t === "income"
                    ? "bg-chart-4 text-primary-foreground"
                    : "bg-destructive text-white "
                  : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Amount */}
        <Controller
          name="amount"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <INPUT
              {...field}
              label="Amount"
              error={error?.message}
              others={{ step: "0.01" }}
              type="number"
              placeholder="$"
            />
          )}
        />

        {/* Category */}
        <Controller
          name="category"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Label className="_label mb-3">Category</Label>
              <PrimarySelect
                {...field}
                options={CATEGORIES[currentType]}
                error={shortText(error?.message as string)}
              />
            </div>
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <INPUT
              {...field}
              label="Description"
              error={error?.message}
              placeholder="What is this for?"
            />
          )}
        />

        {/* Date */}
        <Controller
          name="date"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DateTimeInput
              {...field}
              label="Date"
              type="date"
              error={error?.message}
            />
          )}
        />

        {/* Submit Button */}
        <Button
          waiting={isLoading}
          primaryText={transaction ? "Edit Transaction" : "Add Transaction"}
          waitingText="Saving Transaction..."
          type="submit"
          className="_primaryBtn justify-center w-full"
        />
      </form>
    </Card>
  );
}
