import React, { FC, ReactNode } from "react";
interface ElementProps {
  content?: ReactNode;
  children?:ReactNode
  className?: string;
}

export const Title: FC<ElementProps> = ({ content,children, className }) => {
  return <div className={` font-bold mb-4 text-lg md:text-xl px-1 ${className}`}>{content??children}</div>;
};

export const SubTitle: FC<ElementProps> = ({ content, children, className }) => (
  <div className={`text-lg md:text-xl font-semibold mb-3 ${className}`}>{content ?? children}</div>
);