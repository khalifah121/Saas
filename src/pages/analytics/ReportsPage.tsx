type ReportStatus = "Ready" | "Running" | "Scheduled" | "Failed";

interface Report {
  id: string;
  name: string;
  type: string;
  lastRun: string;
  nextRun: string;
  status: ReportStatus;
  owner: string;
}

const REPORTS: Report[] = [
  { id: "r1", name: "Weekly Traffic Summary",     type: "Automated", lastRun: "May 10, 2026", nextRun: "May 17, 2026", status: "Ready",     owner: "Africa Works" },
  { id: "r2", name: "Monthly Revenue Breakdown",  type: "Automated", lastRun: "May 01, 2026", nextRun: "Jun 01, 2026", status: "Scheduled",  owner: "Africa Works" },
  { id: "r3", name: "Q1 User Acquisition",        type: "Manual",    lastRun: "Apr 02, 2026", nextRun: "—",            status: "Ready",     owner: "Faizol A."    },
  { id: "r4", name: "Conversion Funnel Analysis", type: "Automated", lastRun: "May 11, 2026", nextRun: "May 18, 2026", status: "Running",   owner: "Faizol A."    },
  { id: "r5", name: "Churn Cohort — April",       type: "Manual",    lastRun: "May 09, 2026", nextRun: "—",            status: "Failed",    owner: "Africa Works" },
];

const STATUS_STYLES: Record<ReportStatus, string> = {
  Ready:     "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  Running:   "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  Scheduled: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
  Failed:    "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

function StatusBadge({ status }: { status: ReportStatus }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4 p-3 sm:gap-6 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white sm:text-2xl">Reports</h1>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-sm">
            Manage scheduled and on-demand reports
          </p>
        </div>
        <button
          type="button"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 sm:w-auto"
        >
          + New Report
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { label: "Total",   full: "Total Reports", value: REPORTS.length },
          { label: "Running", full: "Running Now",   value: REPORTS.filter((r) => r.status === "Running").length },
          { label: "Failed",  full: "Failed",        value: REPORTS.filter((r) => r.status === "Failed").length },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-800 sm:p-5">
            <p className="truncate text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400 sm:text-xs sm:tracking-wider">
              <span className="sm:hidden">{card.label}</span>
              <span className="hidden sm:inline">{card.full}</span>
            </p>
            <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white sm:mt-2 sm:text-3xl">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-2.5 md:hidden">
        {REPORTS.map((report) => (
          <div key={report.id} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium leading-snug text-slate-900 dark:text-white">{report.name}</p>
              <StatusBadge status={report.status} />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span>{report.type}</span>
              <span>·</span>
              <span>{report.lastRun}</span>
              <span>·</span>
              <span>{report.owner}</span>
            </div>
            <div className="mt-2.5 flex gap-4 border-t border-slate-100 pt-2.5 dark:border-slate-700">
              <button type="button" className="text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">View</button>
              <button type="button" className="text-xs text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">Run</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-700">
              <tr className="text-left text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="px-4 py-3 font-medium lg:px-6 lg:py-4">Report Name</th>
                <th className="px-4 py-3 font-medium lg:px-6 lg:py-4">Type</th>
                <th className="px-4 py-3 font-medium lg:px-6 lg:py-4">Last Run</th>
                <th className="px-4 py-3 font-medium lg:px-6 lg:py-4">Next Run</th>
                <th className="px-4 py-3 font-medium lg:px-6 lg:py-4">Status</th>
                <th className="px-4 py-3 font-medium lg:px-6 lg:py-4">Owner</th>
                <th className="px-4 py-3 font-medium lg:px-6 lg:py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {REPORTS.map((report) => (
                <tr key={report.id} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50 dark:border-slate-700/50 dark:hover:bg-slate-700/30">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white lg:px-6 lg:py-4">{report.name}</td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400 lg:px-6 lg:py-4">{report.type}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 lg:px-6 lg:py-4">{report.lastRun}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 lg:px-6 lg:py-4">{report.nextRun}</td>
                  <td className="px-4 py-3 lg:px-6 lg:py-4"><StatusBadge status={report.status} /></td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300 lg:px-6 lg:py-4">{report.owner}</td>
                  <td className="px-4 py-3 lg:px-6 lg:py-4">
                    <div className="flex gap-3">
                      <button type="button" className="text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">View</button>
                      <button type="button" className="text-xs text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">Run</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
