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
    <div className="flex h-10 w-full items-end gap-0.5">
      {data.map((v, i) => (
        <div key={i} className={`flex-1 rounded-sm opacity-70 ${color}`} style={{ height: `${v}%` }} />
      ))}
    </div>
  );
}

export default function MetricsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:gap-8 sm:p-8">

      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">Key Metrics</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Business KPIs · May 2026</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {kpi.label}
            </p>
            <div className="mt-3 flex flex-col gap-3">
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {kpi.unit === "$" && <span className="text-xl text-slate-400 dark:text-slate-500">$</span>}
                  {kpi.value}
                  {kpi.unit === "%" && <span className="text-xl text-slate-400 dark:text-slate-500">%</span>}
                </p>
                <p className={`mt-1 text-sm font-medium ${kpi.positive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                  {kpi.change} this month
                </p>
              </div>
              <Sparkline data={kpi.trend} positive={kpi.positive} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Conversion Funnel — This Month
        </h2>
        <div className="flex flex-col gap-3">
          {FUNNEL.map((step, i) => (
            <div key={step.step} className="flex items-center gap-4">
              <span className="w-5 text-xs text-slate-400 dark:text-slate-600">{i + 1}</span>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center justify-between gap-1 text-sm">
                  <span className="text-slate-700 dark:text-slate-300">{step.step}</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {step.count.toLocaleString()}
                    <span className="ml-1 text-xs text-slate-400 dark:text-slate-500">({step.pct}%)</span>
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-2 rounded-full bg-indigo-500 transition-all duration-500"
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
