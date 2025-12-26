"use client";

import type { FC, ReactNode } from "react";
import { Button, TButtonSize, TButtonVariant } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";

interface IDialog {
  hideCloseBtn?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  trigger: ReactNode;
  id?: string;
  variant?: TButtonVariant;
  size?:TButtonSize
  modal?: boolean; //Turn to 'false' when using another modal within e.g cloudinary upload widget
  onOpen?: (b: boolean) => void;
}

export const DIALOG: FC<IDialog> = ({
  title,
  description,
  children,
  className,
  trigger = <MoreHorizontal className="h-4 w-4" />,
  id,
  variant = "secondary",size,
  onOpen,
  modal = true,
}) => {
  return (
    <Dialog modal={modal} onOpenChange={(s) => onOpen?.(s)}>
      <DialogTrigger asChild className={!trigger ? "sr-only" : ""}>
        <Button
          variant={variant}
          size={size}
          title={typeof title == "string" ? title : ""}
          id={id}
        >
          {trigger}
        </Button>
      </DialogTrigger>

      <DialogContent className={` ${className}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription hidden={!description}>
            {description}
          </DialogDescription>
        </DialogHeader>

        <main className={` max-h-[80vh] overflow-y-auto max-w-full pb-6`}>
          {children}
        </main>

        <DialogFooter>
          <DialogClose asChild>
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
