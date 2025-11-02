"use client";

import { ReactNode, useState } from "react";
import { TfiAngleRight } from "react-icons/tfi";
import { usePathname, useRouter } from "next/navigation";
import DiveUpwards from "./Animate";

interface ICollapsibleProps {
  children?: ReactNode;
  triggerStyles?: string;
  headerStyles?: string;
  header: { text: string; link?: string; icon?: ReactNode };
}

const CollapsibleA = ({
  children,
  triggerStyles = "bg-white rounded-full p-1 ",
  headerStyles = "  freeBtn",
  header,
}: ICollapsibleProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { text, icon, link } = header;
  const path = usePathname();
  return (
    <div>
      <header
        className={`flex items-center gap-2 cursor-pointer ${headerStyles} ${
          path == header.link && "primLink"
        }`}
        onClick={() => {
          if (link) router.push(link);
          setIsOpen((p) => !p);
        }}
        data-tip={header.text}
      >
        <span>{icon && icon}</span>
        <p className="grow">{text}</p>
        <button
          className={`group flex items-center justify-center ml-auto ${triggerStyles}`}
        >
          <TfiAngleRight
            className={`group-active:scale-105 slowTrans text-xl ${
              isOpen && "rotate-90"
            }`}
          />
        </button>
      </header>

      {/* Children */}
      <main className="pb-4 bg-accent/60 ">
        {isOpen && <DiveUpwards layoutId="">{children && children}</DiveUpwards>}
      </main>
    </div>
  );
};

export default CollapsibleA;

 
