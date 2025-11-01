import type { FC, ReactNode } from "react";
import { Button } from "./ui/button";
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

interface IDialog {
  hideCloseBtn?: boolean;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  trigger: ReactNode;
  triggerStyles?: string;
  closeId?: string;
  variant?:
    | "secondary"
    | "default"
    | "destructive"
    | "link"
    | "outline"
    | "ghost"
    | null
    | undefined;
}

export const DIALOG: FC<IDialog> = ({
  title,
  description,
  children,
  className,
  trigger = "Open",
  triggerStyles,
  closeId,
  variant = "secondary",
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild >
        <Button variant={variant} className={`cursor-pointer ${triggerStyles}`}>
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

        <main className={` max-h-[80vh] overflow-y-auto`}>
          {children}
        </main>

        <DialogFooter>
          <DialogClose asChild id={closeId}>
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
