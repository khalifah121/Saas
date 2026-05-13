interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  color: string;
  permissions: string[];
}

const ROLES: Role[] = [
  {
    id: "admin",
    name: "Admin",
    description: "Full access to all resources and settings.",
    userCount: 1,
    color: "bg-indigo-500",
    permissions: ["Manage users & roles", "Billing & subscriptions", "View all analytics", "Edit & delete content", "Manage integrations", "Access audit logs"],
  },
  {
    id: "editor",
    name: "Editor",
    description: "Can create and edit content, but cannot manage users or billing.",
    userCount: 3,
    color: "bg-emerald-500",
    permissions: ["View all analytics", "Create & edit content", "Export reports", "Manage own profile"],
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to analytics and content.",
    userCount: 2,
    color: "bg-slate-400",
    permissions: ["View analytics", "View reports", "Manage own profile"],
  },
  {
    id: "billing",
    name: "Billing",
    description: "Access to billing, invoices, and subscription management only.",
    userCount: 1,
    color: "bg-amber-500",
    permissions: ["View & pay invoices", "Manage subscriptions", "Download receipts", "Manage own profile"],
  },
];

function PermissionTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-700 dark:bg-slate-700 dark:text-slate-300 sm:gap-1.5 sm:px-2 sm:py-1 sm:text-xs">
      <span className="text-emerald-500 dark:text-emerald-400">✓</span>
      {label}
    </span>
  );
}

export default function RolesPage() {
  return (
    <div className="flex flex-col gap-4 p-3 sm:gap-6 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white sm:text-2xl">Roles & Permissions</h1>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-sm">
            Define what each role can access in the app
          </p>
        </div>
        <button
          type="button"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 sm:w-auto"
        >
          + New Role
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
        {ROLES.map((role) => (
          <div key={role.id} className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-800 sm:p-5">
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 shrink-0 rounded-full sm:h-2.5 sm:w-2.5 ${role.color}`} />
              <p className="truncate text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400 sm:text-xs sm:tracking-wider">
                {role.name}
              </p>
            </div>
            <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white sm:mt-2 sm:text-3xl">
              {role.userCount}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 sm:text-xs">
              {role.userCount === 1 ? "user" : "users"}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {ROLES.map((role) => (
          <div key={role.id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white sm:h-9 sm:w-9 ${role.color}`}>
                  {role.name[0]}
                </span>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{role.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {role.userCount} {role.userCount === 1 ? "user" : "users"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-md px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                Edit
              </button>
            </div>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:mt-3">
              {role.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
              {role.permissions.map((perm) => (
                <PermissionTag key={perm} label={perm} />
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
