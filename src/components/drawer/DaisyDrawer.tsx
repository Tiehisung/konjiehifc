"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";

interface IDrawerProps {
  children?: ReactNode;
  trigger?: ReactNode;
  triggerStyles?: string;
  id: string;
  openFromRight?: boolean;
  sidebarStyles?: string;
}
/**
 * Powered by daisyUi.
 * @param  id String id for targeting.
 * @param  trigger UI Element or string to describe the opener.
 * @param  children The content to display on the sidebar.
 * @returns
 */
const PrimaryDrawer: FC<IDrawerProps> = ({
  id = "drawerId",
  trigger,
  children,
  openFromRight,
  triggerStyles = "btn",
  sidebarStyles,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Close on path change
  useEffect(() => {
    if (isOpen) document.getElementById(id)?.click();
  }, [window.location.pathname]);

  return (
    <div className={`drawer ${openFromRight && "drawer-end"}`}>
      <input
        onChange={(e) => setIsOpen(e.target.checked)}
        id={id}
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor={id} className={triggerStyles}>
          {trigger ?? <CiMenuBurger className="text-3xl" />}
        </label>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor={id}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className={` bg-base-200 min-h-full w-80 ${sidebarStyles}`}>
          {/* Sidebar content here */}
          {children}
        </aside>
      </div>
    </div>
  );
};

export default PrimaryDrawer;
