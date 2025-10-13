"use client";

import { IFileProps } from "@/types";
import Image from "next/image";
import React, { ReactNode } from "react";
interface ImageDisplayProps extends IFileProps {
  className?: string;
  footer?: ReactNode;
}

const ImageDisplayCard = ({
  description,
  name,
  secure_url,
  className,
  footer,
}: Partial<ImageDisplayProps>) => {
  return (
    <div>
      <Image
        src={secure_url ?? ""}
        alt={name ?? "image"}
        width={500}
        height={500}
        className={`rounded-badge ${className}`}
      />
      <div className="max-w-full">
        {footer ?? <p className="font-light">{description}</p>}
      </div>
    </div>
  );
};

export default ImageDisplayCard;
