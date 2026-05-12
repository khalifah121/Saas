import React, { useState } from "react";
import Sidebar        from "./components/Sidebar";
import DashboardPage  from "./pages/DashboardPage";
import OverviewPage   from "./pages/analytics/OverviewPage";
import ReportsPage    from "./pages/analytics/ReportsPage";
import MetricsPage    from "./pages/analytics/MetricsPage";
import AllUsersPage   from "./pages/users/AllUsersPage";
import RolesPage      from "./pages/users/RolesPage";

const PAGES: Record<string, React.ReactNode> = {
  dashboard:   <DashboardPage />,
  overview:    <OverviewPage />,
  reports:     <ReportsPage />,
  metrics:     <MetricsPage />,
  "all-users": <AllUsersPage />,
  roles:       <RolesPage />,
};

export default function App() {
  const [activeId, setActiveId] = useState("dashboard");

  const activePage = PAGES[activeId] ?? (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8">
      <h1 className="text-3xl font-bold capitalize text-slate-900 dark:text-white">{activeId}</h1>
      <p className="text-slate-500 dark:text-slate-400">This page is coming soon.</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-white">
      <Sidebar activeId={activeId} onSelect={setActiveId} />
      <main className="min-w-0 flex-1 overflow-y-auto">
        {activePage}
      </main>
    </div>
  );
}
