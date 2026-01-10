"use client";

import { ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ILinkItem } from "./GroupedSidebarLinks";

interface SidebarLinkProps {
  item: ILinkItem;
  depth?: number;
  onNavigate?: (path: string) => void;
}

const SidebarLink = ({ item, depth = 0, onNavigate }: SidebarLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    pathname === item.path || pathname?.startsWith(item.path + "/");

  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else if (onNavigate) {
      onNavigate(item.path);
    } else {
      router.push(item.path);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  // Calculate padding - Tailwind-safe approach
  const paddingLeft = depth * 16; // 16px per depth level

  return (
    <div>
      <div
        className={`
          flex items-center p-3 rounded cursor-pointer
          transition-colors duration-200
          ${
            isActive
              ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
              : "hover:bg-gray-100"
          }
        `}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={hasChildren ? isOpen : undefined}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        {item.icon && (
          <span className="mr-3 text-lg" aria-hidden="true">
            {item.icon}
          </span>
        )}
        <span className="grow font-medium">{item.title}</span>
        {hasChildren && (
          <span
            className="ml-2 text-xs transition-transform duration-200"
            style={{ transform: isOpen ? "rotate(90deg)" : "none" }}
          >
            ▶
          </span>
        )}
      </div>

      {hasChildren && isOpen && (
        <div>
          {item.children!.map((child, index) => (
            <SidebarLink
              key={`${child.path}-${index}`}
              item={child}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  links: ILinkItem[];
  onNavigate?: (path: string) => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  links,
  onNavigate,
  className = "",
}) => {
  return (
    <aside
      className={`
        w-64 h-screen bg-white border-r border-gray-200 
        overflow-y-auto ${className}
      `}
      aria-label="Main navigation"
    >
      <nav className="p-4">
        <div className="mb-8 px-3">
          <h2 className="text-lg font-semibold text-gray-700">Navigation</h2>
        </div>

        <div className="space-y-1">
          {links.map((link, index) => (
            <SidebarLink
              key={`${link.path}-${index}`}
              item={link}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
};

// Alternative: Using Link component for proper navigation
const SidebarLinkWithNextLink = ({ item, depth = 0 }: SidebarLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive =
    pathname === item.path || pathname?.startsWith(item.path + "/");

  const hasChildren = item.children && item.children.length > 0;
  const paddingLeft = depth * 16;

  if (hasChildren) {
    return (
      <div>
        <div
          className={`
            flex items-center p-3 rounded cursor-pointer
            transition-colors duration-200
            ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}
          `}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => e.key === "Enter" && setIsOpen(!isOpen)}
          tabIndex={0}
          role="button"
          aria-expanded={isOpen}
          style={{ paddingLeft: `${paddingLeft}px` }}
        >
          {item.icon && <span className="mr-3">{item.icon}</span>}
          <span className="grow">{item.title}</span>
          <span className={`transition-transform ${isOpen ? "rotate-90" : ""}`}>
            ▶
          </span>
        </div>

        {isOpen && (
          <div>
            {item.children!.map((child, index) => (
              <SidebarLinkWithNextLink
                key={`${child.path}-${index}`}
                item={child}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href={item.path} passHref legacyBehavior>
      <a
        className={`
          flex items-center p-3 rounded transition-colors duration-200 
          ${
            isActive
              ? "bg-blue-50 text-blue-600 border-l-4 border-blue-500"
              : "hover:bg-gray-100"
          }
        `}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        {item.icon && <span className="mr-3">{item.icon}</span>}
        <span>{item.title}</span>
      </a>
    </Link>
  );
};

// Example usage with Next.js App Router:
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarLinks: ILinkItem[] = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      title: "Products",
      path: "/products",
      icon: "📦",
      children: [
        {
          title: "All Products",
          path: "/products/all",
        },
        {
          title: "Categories",
          path: "/products/categories",
          children: [
            {
              title: "Electronics",
              path: "/products/categories/electronics",
            },
            {
              title: "Clothing",
              path: "/products/categories/clothing",
            },
          ],
        },
      ],
    },
    {
      title: "Orders",
      path: "/orders",
      icon: "📝",
      children: [
        {
          title: "Recent Orders",
          path: "/orders/recent",
        },
        {
          title: "Completed",
          path: "/orders/completed",
        },
      ],
    },
    {
      title: "Settings",
      path: "/settings",
      icon: "⚙️",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar links={sidebarLinks} className="sticky top-0" />
      <main className="grow p-6 bg-gray-50">{children}</main>
    </div>
  );
}
