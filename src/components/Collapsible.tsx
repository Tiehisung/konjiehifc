"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface ICollapsible {
  header: {
    icon?: ReactNode;
    label: ReactNode;
    path?: string;
    className?: string;
  };
  children: ReactNode;
  isMinimize?: boolean;
}

export function PrimaryCollapsible({
  children,
  header,
  isMinimize,
}: ICollapsible) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActiveLink = (path: string) => pathname === path;
  return (
    <div className="space-y-1 w-full ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-3 rounded-lg _hover _slowTrans ${
          isActiveLink(header.path || "")
            ? "bg-primary/10 text-muted-foreground"
            : ""
        } ${header.className ?? ""}`}
      >
        <div className="flex items-center gap-3 grow">
          <span className="flex-shrink-0">{header.icon}</span>
          <AnimatePresence>
            {!isMinimize && (
              <motion.div
                variants={contentVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="font-medium "
              >
                {header.label}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {!isMinimize && (
            <motion.div
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <ChevronDown
                size={16}
                className={`_slowTrans ${isOpen ? "" : "-rotate-90"}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {!isMinimize && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-3 space-y-1 border-l border-gray-200 pl-4 mb-8">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const contentVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.2,
    },
  },
};
