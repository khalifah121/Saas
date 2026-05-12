import { useState } from "react";
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
      { id: "reports",  label: "Reports",  icon: "📋", href: "#reports"  },
      { id: "metrics",  label: "Metrics",  icon: "📉", href: "#metrics"  },
    ],
  },
  {
    id: "users",
    label: "Users",
    icon: "👥",
    children: [
      { id: "all-users", label: "All Users", icon: "👤", href: "#all-users" },
      { id: "roles",     label: "Roles",     icon: "🔑", href: "#roles"     },
    ],
  },
  { id: "settings", label: "Settings", icon: "⚙️", href: "#settings" },
  { id: "help",     label: "Help",     icon: "❓", href: "#help"     },
];

interface NavLinkProps {
  item: NavItem & { href: string };
  isActive: boolean;
  isCollapsed: boolean;
  depth?: number;
  onClick: (id: string) => void;
}

function NavLink({ item, isActive, isCollapsed, depth = 0, onClick }: NavLinkProps) {
  return (
    <a
      href={item.href}
      onClick={() => onClick(item.id)}
      title={isCollapsed ? item.label : undefined}
      className={[
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
        depth > 0 ? "ml-4 border-l border-slate-200 pl-4 dark:border-slate-700" : "",
        isActive
          ? "bg-indigo-600 text-white"
          : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white",
      ].join(" ")}
    >
      <span className="text-base leading-none">{item.icon}</span>
      {!isCollapsed && <span className="truncate">{item.label}</span>}
    </a>
  );
}

interface AccordionGroupProps {
  item: NavItem & { children: NavItem[] };
  activeId: string;
  isCollapsed: boolean;
  onSelect: (id: string) => void;
}

function AccordionGroup({ item, activeId, isCollapsed, onSelect }: AccordionGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasActiveChild = item.children.some((child) => child.id === activeId);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        title={isCollapsed ? item.label : undefined}
        className={[
          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
          hasActiveChild
            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-600/20 dark:text-indigo-300"
            : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white",
        ].join(" ")}
      >
        <span className="text-base leading-none">{item.icon}</span>
        {!isCollapsed && (
          <>
            <span className="flex-1 truncate text-left">{item.label}</span>
            <span className={["text-xs transition-transform duration-200", isOpen ? "rotate-180" : ""].join(" ")}>
              ▾
            </span>
          </>
        )}
      </button>

      {!isCollapsed && isOpen && (
        <div className="mt-1 flex flex-col gap-1">
          {item.children.map((child) => {
            if (!child.href) return null;
            return (
              <NavLink
                key={child.id}
                item={child as NavItem & { href: string }}
                isActive={activeId === child.id}
                isCollapsed={false}
                depth={1}
                onClick={onSelect}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ activeId, onSelect }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={[
        "flex h-screen flex-col border-r bg-white transition-[width] duration-300 dark:border-slate-700 dark:bg-slate-900",
        isCollapsed ? "w-16 border-slate-200" : "w-64 border-slate-200",
      ].join(" ")}
    >
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-700">
        {!isCollapsed && (
          <span className="text-lg font-bold tracking-wide text-slate-900 dark:text-white">MyApp</span>
        )}
        <div className={["flex items-center gap-1", isCollapsed ? "w-full flex-col justify-center" : ""].join(" ")}>
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-4">
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <AccordionGroup
              key={item.id}
              item={item as NavItem & { children: NavItem[] }}
              activeId={activeId}
              isCollapsed={isCollapsed}
              onSelect={onSelect}
            />
          ) : (
            <NavLink
              key={item.id}
              item={item as NavItem & { href: string }}
              isActive={activeId === item.id}
              isCollapsed={isCollapsed}
              depth={0}
              onClick={onSelect}
            />
          )
        )}
      </nav>

      <div className="border-t border-slate-200 px-2 py-4 dark:border-slate-700">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
            AW
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">Africa Works</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">faizol@gmail.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
