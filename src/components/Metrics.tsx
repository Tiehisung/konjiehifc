"use client";

import Loader from "./loaders/Loader";

interface IProps {
  title?: string;
  icon?: React.ReactNode;
  value?: string | number;
  color?: "red" | "blue" | "green" | "purple" | "orange";
  isLoading?: boolean;
}

export function MetricCard({ title, icon, value, color, isLoading }: IProps) {
  const colorMap: Record<string, string> = {
    red: "bg-red-50",
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
    orange: "bg-orange-50",
  };
  const textColorMap: Record<string, string> = {
    red: "text-red-500",
    blue: "text-blue-500",
    green: "text-green-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
  };
  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex items-center justify-between">
        <div className='grow'>
          <p className="text-sm text-muted-foreground grow">
            {isLoading ? <div className="animate-pulse bg-muted h-4 w-full" /> : title}
          </p>
          <p
            className={`text-2xl font-bold ${
              color ? `${textColorMap[color]}` : ""
            }`}
          >
            {isLoading ? <Loader size="sm" /> : value}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            color ? ` ${colorMap[color]}` : ""
          } ${color ? textColorMap[color || "blue"] : ""}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
