interface KPI {
  label: string;
  value: string;
  unit: string;
  change: string;
  positive: boolean;
  trend: number[];
}

const KPIS: KPI[] = [
  { label: "Monthly Recurring Revenue", value: "42,800", unit: "$", change: "+9.3%",  positive: true,  trend: [30, 45, 40, 55, 60, 70, 65, 80] },
  { label: "Customer Acquisition Cost", value: "38.50",  unit: "$", change: "-4.1%",  positive: true,  trend: [70, 65, 68, 60, 55, 52, 48, 45] },
  { label: "Customer Lifetime Value",   value: "920",    unit: "$", change: "+5.7%",  positive: true,  trend: [50, 55, 52, 60, 65, 70, 72, 78] },
  { label: "Churn Rate",                value: "2.4",    unit: "%", change: "+0.3%",  positive: false, trend: [20, 22, 21, 23, 24, 26, 25, 27] },
];

const FUNNEL = [
  { step: "Visited Site",     count: 84_210, pct: 100 },
  { step: "Viewed Pricing",   count: 31_840, pct: 38  },
  { step: "Started Signup",   count: 12_210, pct: 14  },
  { step: "Completed Signup", count:  7_430, pct: 9   },
  { step: "Activated",        count:  5_120, pct: 6   },
];

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const color = positive ? "bg-emerald-500" : "bg-red-500";
  return (
    <div className="flex h-8 w-full items-end gap-0.5 sm:h-10">
      {data.map((v, i) => (
        <div key={i} className={`flex-1 rounded-sm opacity-70 ${color}`} style={{ height: `${v}%` }} />
      ))}
    </div>
  );
}

export default function MetricsPage() {
  return (
    <div className="flex flex-col gap-4 p-3 sm:gap-6 sm:p-6 lg:p-8">

      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white sm:text-2xl">Key Metrics</h1>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-sm">Business KPIs · May 2026</p>
      </div>

      {/* KPI cards — 1 col on mobile, 2 on sm+ */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 sm:p-6">
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:text-xs">
              {kpi.label}
            </p>
            <div className="mt-2 flex flex-col gap-2 sm:mt-3 sm:gap-3">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                  {kpi.unit === "$" && <span className="text-lg text-slate-400 dark:text-slate-500 sm:text-xl">$</span>}
                  {kpi.value}
                  {kpi.unit === "%" && <span className="text-lg text-slate-400 dark:text-slate-500 sm:text-xl">%</span>}
                </p>
                <p className={`mt-0.5 text-xs font-medium sm:mt-1 sm:text-sm ${kpi.positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                  {kpi.change} this month
                </p>
              </div>
              <Sparkline data={kpi.trend} positive={kpi.positive} />
            </div>
          </div>
        ))}
      </div>

      {/* Conversion funnel */}
      <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 sm:p-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:mb-6 sm:text-sm">
          Conversion Funnel — This Month
        </h2>
        <div className="flex flex-col gap-3">
          {FUNNEL.map((step, i) => (
            <div key={step.step} className="flex items-center gap-2 sm:gap-4">
              <span className="w-4 shrink-0 text-xs text-slate-400 dark:text-slate-600">{i + 1}</span>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center justify-between gap-1 text-xs sm:text-sm">
                  <span className="text-slate-700 dark:text-slate-300">{step.step}</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {step.count.toLocaleString()}
                    <span className="ml-1 text-[10px] text-slate-400 dark:text-slate-500 sm:text-xs">({step.pct}%)</span>
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 sm:h-2">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                    style={{ width: `${step.pct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
