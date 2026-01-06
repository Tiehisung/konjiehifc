"use client";

import { ReactNode } from "react";
import Loader from "./loaders/Loader";
import CountUp from "react-countup";
import { TColor } from "@/types/color";

interface IProps {
  title?: string;
  icon?: React.ReactNode;
  value?: string | number;
  color?: TColor;
  isLoading?: boolean;
}

export function MetricCard({ title, icon, value, color, isLoading }: IProps) {
  const txtCl = `text-${color}-500`;
  const cl = `${txtCl} bg-${color}-50`;
  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex items-center justify-between">
        <div className="grow">
          <p className="text-sm text-muted-foreground grow">
            {isLoading ? (
              <div className="animate-pulse bg-muted h-4 w-full" />
            ) : (
              title
            )}
          </p>
          <p className={`text-2xl font-bold ${txtCl}`}>
            {isLoading ? <Loader size="sm" /> : value}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${cl} `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

interface ICountupProps {
  icon: ReactNode;
  value: string | number;
  isCountUp?: boolean;
  description?: string;
  countupSuffix?: string;
  countupPrefix?: string;
  isLoading?: boolean;
}
export function CountupMetricCard({
  icon,
  value,
  countupPrefix,
  countupSuffix,
  description,
  isCountUp,
  isLoading,
}: ICountupProps) {
  return (
    <div className="text-center p-4 rounded-2xl bg-card/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex justify-center mb-2 text-yellow-500">{icon}</div>
      <div className="text-3xl font-bold text-white mb-1">
        {isLoading ? (
          <div className="animate-pulse bg-secondary h-4 w-full" />
        ) : (
          <div>
            {isCountUp ? (
              <CountUp
                end={Number(value ?? 0)}
                prefix={countupPrefix ?? ""}
                suffix={countupSuffix ?? ""}
              />
            ) : (
              value
            )}
          </div>
        )}
      </div>
      <div className="text-sm text-white/60 grow">
        {isLoading ? (
          <div className="animate-pulse bg-secondary h-4 w-full" />
        ) : (
          description
        )}
      </div>
    </div>
  );
}
