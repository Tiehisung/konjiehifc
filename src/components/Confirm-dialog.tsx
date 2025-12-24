// "use client";

// import * as React from "react";
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogFooter,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import { Button, TButtonVariant } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { useAction } from "@/hooks/action";

// interface ConfirmDialogProps {
//   //   open?: boolean;
//   //   onOpenChange?: (open: boolean) => void; //External control

//   title?: string;
//   description?: React.ReactNode;

//   confirmText?: string;
//   cancelText?: string;

//   variant?: TButtonVariant;

//   trigger?: React.ReactNode;
//   className?: string;
//   action: {
//     method: "PUT" | "POST" | "DELETE" | "GET";
//     body?: object;
//     uri: string;
//   };
// }

// export function ConfirmDialog({
//   title = "Are you sure?",
//   description = "This action cannot be undone.",
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   variant = "default",
//   trigger,
//   className,
//   action: { method = "GET", body, uri },
// }: ConfirmDialogProps) {
//   const { handleAction, isLoading } = useAction();
//   return (
//     <AlertDialog
//     //  open={open} onOpenChange={onOpenChange} //external control only
//     >
//       <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

//       <AlertDialogContent className={cn("sm:max-w-md", className)}>
//         <AlertDialogHeader>
//           <AlertDialogTitle>{title}</AlertDialogTitle>
//           <AlertDialogDescription>{description}</AlertDialogDescription>
//         </AlertDialogHeader>

//         <AlertDialogFooter>
//           <AlertDialogCancel disabled={isLoading}>
//             {cancelText}
//           </AlertDialogCancel>

//           <AlertDialogAction asChild>
//             <Button
//               variant={variant}
//               onClick={() =>
//                 handleAction({
//                   method,
//                   body,
//                   uri,
//                   escapeOnEnd: true,
//                 })
//               }
//               disabled={isLoading}
//             >
//               {isLoading ? "Please wait..." : confirmText}
//             </Button>
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
