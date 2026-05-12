interface StatCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

const STATS: StatCard[] = [
  { label: "Total Sessions",  value: "128,430", change: "+12.4%", positive: true  },
  { label: "Unique Visitors", value: "84,210",  change: "+8.1%",  positive: true  },
  { label: "Bounce Rate",     value: "38.6%",   change: "-2.3%",  positive: true  },
  { label: "Avg. Session",    value: "4m 22s",  change: "-0.8%",  positive: false },
];

const DAILY_SESSIONS = [62, 78, 55, 90, 83, 100, 74];
const DAYS           = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TOP_PAGES = [
  { page: "/dashboard",   views: "24,310", bounce: "28%", avgTime: "5m 12s" },
  { page: "/pricing",     views: "18,942", bounce: "51%", avgTime: "2m 08s" },
  { page: "/features",    views: "14,230", bounce: "44%", avgTime: "3m 31s" },
  { page: "/blog/launch", views: "9,870",  bounce: "36%", avgTime: "6m 50s" },
  { page: "/signup",      views: "7,654",  bounce: "22%", avgTime: "1m 44s" },
];

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-4 p-3 sm:gap-6 sm:p-6 lg:p-8">

      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white sm:text-2xl">Analytics Overview</h1>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-sm">Last 7 days · Updated just now</p>
      </div>

      {/* 1 col → 2 col → 4 col */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
            <p className="mt-1.5 text-2xl font-bold text-slate-900 dark:text-white sm:mt-2 sm:text-3xl">{stat.value}</p>
            <p className={`mt-1 text-xs font-medium sm:text-sm ${stat.positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
              {stat.change} vs last week
            </p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 sm:p-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:mb-6 sm:text-sm">
          Daily Sessions
        </h2>
        <div className="flex h-28 items-end gap-1.5 sm:h-36 sm:gap-3">
          {DAILY_SESSIONS.map((height, i) => (
            <div
              key={DAYS[i]}
              className="flex-1 rounded-t-md bg-indigo-500 transition-all duration-300 hover:bg-indigo-400"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex gap-1.5 sm:gap-3">
          {DAYS.map((day) => (
            <div key={day} className="flex-1 text-center">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 sm:text-xs">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top pages */}
      <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 sm:p-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:mb-4 sm:text-sm">
          Top Pages
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-85 text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-[10px] uppercase tracking-wider text-slate-400 dark:border-slate-700 dark:text-slate-500 sm:text-xs">
                <th className="pb-2 font-medium sm:pb-3">Page</th>
                <th className="pb-2 font-medium sm:pb-3">Views</th>
                <th className="pb-2 font-medium sm:pb-3">Bounce</th>
                <th className="pb-2 font-medium sm:pb-3">Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PAGES.map((row) => (
                <tr key={row.page} className="border-b border-slate-100 text-slate-600 last:border-0 dark:border-slate-700/50 dark:text-slate-300">
                  <td className="py-2 font-mono text-[10px] text-indigo-600 dark:text-indigo-400 sm:py-3 sm:text-xs">{row.page}</td>
                  <td className="py-2 text-xs sm:py-3 sm:text-sm">{row.views}</td>
                  <td className="py-2 text-xs sm:py-3 sm:text-sm">{row.bounce}</td>
                  <td className="py-2 text-xs sm:py-3 sm:text-sm">{row.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
