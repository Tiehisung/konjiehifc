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
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  trigger: ReactNode;
  closeId?: string;
  id?: string;
  modal?: boolean; //Turn to 'false' when using another modal within e.g cloudinary upload widget
}

export const DIALOG: FC<IDialog> = ({
  title,
  description,
  children,
  className,
  trigger = "Open",
  closeId,
  id,
  modal = true,
}) => {
  return (
    <Dialog modal={modal}>
      <DialogTrigger asChild className={`cursor-pointer`} id={id}>
        {trigger}
      </DialogTrigger>

      <DialogContent className={` ${className}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription hidden={!description}>
            {description}
          </DialogDescription>
        </DialogHeader>

        <main className={` max-h-[80vh] pb-4 overflow-y-auto`}>{children}</main>

        <DialogFooter>
          <DialogClose asChild id={closeId}>
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
