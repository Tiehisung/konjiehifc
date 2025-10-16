import React, { FC, ReactNode } from "react";
interface ElementProps {
  content?: ReactNode;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export const Title: FC<ElementProps> = ({
  content,
  children,
  className = "bg-popover/35 justify-center",
  icon,
}) => {
  return (
    <div
      className={` font-bold mb-4 text-xl md:text-3xl p-2.5 flex gap-4 grow ${className}`}
    >
      {icon} {content ?? children}
    </div>
  );
};

export const SubTitle: FC<ElementProps> = ({
  content,
  children,
  className,
}) => (
  <div className={`text-lg md:text-xl font-semibold mb-3 ${className}`}>
    {content ?? children}
  </div>
);
