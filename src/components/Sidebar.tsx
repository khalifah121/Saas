import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../context/ThemeContext";

type NavItem =
  | { id: string; label: string; icon: string; href: string; children?: never }
  | { id: string; label: string; icon: string; href?: never; children: NavItem[] };

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "🏠", href: "#dashboard" },
  {
    id: "analytics",
    label: "Analytics",
    icon: "📊",
    children: [
      { id: "overview", label: "Overview", icon: "📈", href: "#overview" },
      { id: "reports", label: "Reports", icon: "📋", href: "#reports" },
      { id: "metrics", label: "Metrics", icon: "📉", href: "#metrics" },
    ],
  },
  {
    id: "users",
    label: "Users",
    icon: "👥",
    children: [
      { id: "all-users", label: "All Users", icon: "👤", href: "#all-users" },
      { id: "roles", label: "Roles", icon: "🔑", href: "#roles" },
    ],
  },
  { id: "settings", label: "Settings", icon: "⚙️", href: "#settings" },
  { id: "help", label: "Help", icon: "❓", href: "#help" },
];

const COLLAPSED_WIDTH = 64;

interface NavLinkProps {
  item: NavItem & { href: string };
  isActive: boolean;
  isCollapsed: boolean;
  depth?: number;
  onClick: (id: string) => void;
  closeMobile?: () => void;
}

function NavLink({ item, isActive, isCollapsed, depth = 0, onClick, closeMobile }: NavLinkProps) {
  return (
    <a
      href={item.href}
      onClick={() => { onClick(item.id); closeMobile?.(); }}
      className={[
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        depth > 0 ? "ml-4 border-l border-slate-200 pl-4 dark:border-slate-700" : "",
        isActive
          ? "bg-indigo-600 text-white"
          : "text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700",
      ].join(" ")}
    >
      <span>{item.icon}</span>
      {!isCollapsed && <span>{item.label}</span>}
    </a>
  );
}

interface AccordionGroupProps {
  item: NavItem & { children: NavItem[] };
  activeId: string;
  isCollapsed: boolean;
  onSelect: (id: string) => void;
  closeMobile?: () => void;
}

function AccordionGroup({ item, activeId, isCollapsed, onSelect, closeMobile }: AccordionGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverTop, setPopoverTop] = useState(0);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const hasActiveChild = item.children.some((child) => child.id === activeId);

  function handleClick() {
    if (isCollapsed) {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (rect) setPopoverTop(rect.top);
    }
    setIsOpen((prev) => !prev);
  }

  function handleChildSelect(id: string) {
    onSelect(id);
    setIsOpen(false);
    closeMobile?.();
  }

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={[
          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
          hasActiveChild
            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-600/20 dark:text-indigo-300"
            : "text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700",
        ].join(" ")}
      >
        <span>{item.icon}</span>
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left">{item.label}</span>
            <span>{isOpen ? "▴" : "▾"}</span>
          </>
        )}
      </button>

      {!isCollapsed && isOpen && (
        <div className="mt-1 flex flex-col gap-1">
          {item.children.map((child) =>
            child.href ? (
              <NavLink
                key={child.id}
                item={child as NavItem & { href: string }}
                isActive={activeId === child.id}
                isCollapsed={false}
                depth={1}
                onClick={handleChildSelect}
                closeMobile={closeMobile}
              />
            ) : null
          )}
        </div>
      )}

      {isCollapsed && isOpen && createPortal(
        <div
          style={{ top: popoverTop, left: COLLAPSED_WIDTH + 8 }}
          className="fixed z-50 min-w-44 rounded-lg border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-800"
        >
          {item.children.map((child) =>
            child.href ? (
              <NavLink
                key={child.id}
                item={child as NavItem & { href: string }}
                isActive={activeId === child.id}
                isCollapsed={false}
                onClick={handleChildSelect}
              />
            ) : null
          )}
        </div>,
        document.body
      )}
    </div>
  );
}

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ activeId, onSelect, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={[
          "fixed md:static z-40 md:z-auto",
          "h-screen flex flex-col border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900",
          "transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          isCollapsed ? "w-16" : "w-64 md:w-56",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-3 py-4 dark:border-slate-700">
          {!isCollapsed && <span className="truncate font-bold text-slate-900 dark:text-white">MyApp</span>}

          <div className="flex items-center gap-2">
            <button
              className="md:hidden text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              onClick={() => setIsMobileOpen(false)}
            >
              ✕
            </button>
            <button
              onClick={toggleTheme}
              className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setIsCollapsed((p) => !p)}
              className="hidden md:block text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {isCollapsed ? "→" : "←"}
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <AccordionGroup
                key={item.id}
                item={item}
                activeId={activeId}
                isCollapsed={isCollapsed}
                onSelect={onSelect}
                closeMobile={() => setIsMobileOpen(false)}
              />
            ) : (
              <NavLink
                key={item.id}
                item={item as NavItem & { href: string }}
                isActive={activeId === item.id}
                isCollapsed={isCollapsed}
                onClick={onSelect}
                closeMobile={() => setIsMobileOpen(false)}
              />
            )
          )}
        </nav>

        <div className="border-t border-slate-200 p-3 dark:border-slate-700">
          {!isCollapsed && (
            <div className="text-sm">
              <p className="font-medium text-slate-900 dark:text-white">Africa Works</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">faizol@gmail.com</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
