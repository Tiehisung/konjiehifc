"use client";

import * as React from "react";

import { Button, TButtonSize, TButtonVariant } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAction } from "@/hooks/action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface ConfirmDialogProps {
  //   open?: boolean;
  //   onOpenChange?: (open: boolean) => void; //External control

  title?: string;
  description?: React.ReactNode;

  confirmText?: string;
  cancelText?: string;

  disabled?: boolean;

  variant?: TButtonVariant;
  size?: TButtonSize;
  trigger?: React.ReactNode;
  triggerStyles?: string;
  className?: string;
  action: {
    method: "PUT" | "POST" | "DELETE" | "GET";
    body?: object;
    uri: string;
    goBackAfter?:boolean
  };
}

export function ConfirmDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  trigger,
  className,
  action: { method = "GET", body, uri ,goBackAfter},
  size,
  disabled,
  triggerStyles,
}: ConfirmDialogProps) {
  const { handleAction, isLoading } = useAction();
  return (
    <AlertDialog 
    //  open={open} onOpenChange={onOpenChange} //external control only
    >
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          title={typeof title == "string" ? title : ""}
          className={cn(`h-fit `, triggerStyles)}
          disabled={disabled}
        >
          {trigger}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className={cn("sm:max-w-md", className)} >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {typeof description === "string" ? (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
              description
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter >
          <AlertDialogCancel disabled={isLoading}>
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction asChild >
            <Button
              variant={variant}
              onClick={() =>
                handleAction({
                  method,
                  body,
                  uri,
                  escapeOnEnd: true,
                  goBackAfter:goBackAfter
                })
              }
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
