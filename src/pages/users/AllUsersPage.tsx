type UserStatus = "Active" | "Inactive" | "Pending";
type UserRole   = "Admin" | "Editor" | "Viewer" | "Billing";

interface User {
  id: string;
  initials: string;
  color: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
}

const USERS: User[] = [
  { id: "u1", initials: "AW", color: "bg-indigo-500",  name: "Africa Works",     email: "faizol@gmail.com",  role: "Admin",   status: "Active",   joined: "Jan 12, 2025" },
  { id: "u2", initials: "FA", color: "bg-emerald-500", name: "Faizol A.",         email: "faizol@works.io",   role: "Editor",  status: "Active",   joined: "Feb 03, 2025" },
  { id: "u3", initials: "BW", color: "bg-pink-500",    name: "Bola Wasiu",        email: "Wasiu@works.io",    role: "Viewer",  status: "Active",   joined: "Mar 18, 2025" },
  { id: "u4", initials: "IN", color: "bg-amber-500",   name: "Ikenna Nduks",      email: "Nduks@works.io",    role: "Billing", status: "Active",   joined: "Apr 01, 2025" },
  { id: "u5", initials: "OT", color: "bg-cyan-500",    name: "Opeyemi Toheeb",    email: "Opeyemi@works.io",  role: "Editor",  status: "Inactive", joined: "Apr 22, 2025" },
  { id: "u6", initials: "OL", color: "bg-violet-500",  name: "Osapa London",      email: "Osapa@works.io",    role: "Viewer",  status: "Pending",  joined: "May 05, 2026" },
  { id: "u7", initials: "MO", color: "bg-rose-500",    name: "Madukaku Ogbonaya", email: "Madukaku@works.io", role: "Editor",  status: "Active",   joined: "May 09, 2026" },
];

const ROLE_STYLES: Record<UserRole, string> = {
  Admin:   "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
  Editor:  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  Viewer:  "bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-300",
  Billing: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
};

const STATUS_STYLES: Record<UserStatus, string> = {
  Active:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  Inactive: "bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400",
  Pending:  "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
};

function Avatar({ user }: { user: User }) {
  return (
    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${user.color}`}>
      {user.initials}
    </div>
  );
}

function RoleBadge({ role }: { role: UserRole }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_STYLES[role]}`}>
      {role}
    </span>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

export default function AllUsersPage() {
  const active = USERS.filter((u) => u.status === "Active").length;
  const admins = USERS.filter((u) => u.role === "Admin").length;

  const SUMMARY = [
    { label: "Total Users", short: "Users",  value: USERS.length },
    { label: "Active",      short: "Active", value: active },
    { label: "Admins",      short: "Admins", value: admins },
  ];

  return (
    <div className="flex flex-col gap-4 p-3 sm:gap-6 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white sm:text-2xl">All Users</h1>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:mt-1 sm:text-sm">
            Manage team members and their access
          </p>
        </div>
        <button
          type="button"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 sm:w-auto"
        >
          + Invite User
        </button>
      </div>

      {/* Summary cards — 3 cols always, compact on mobile */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {SUMMARY.map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-2.5 dark:border-slate-700 dark:bg-slate-800 sm:p-5">
            {/* Show short label on very small screens, full label on sm+ */}
            <p className="truncate text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400 sm:text-xs sm:tracking-wider">
              <span className="sm:hidden">{card.short}</span>
              <span className="hidden sm:inline">{card.label}</span>
            </p>
            <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white sm:mt-2 sm:text-3xl">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile card list — shown below md */}
      <div className="flex flex-col gap-2.5 md:hidden">
        {USERS.map((user) => (
          <div key={user.id} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 sm:p-4">
            {/* Top row: avatar + name/email + status */}
            <div className="flex items-center gap-2.5">
              <Avatar user={user} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{user.name}</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
              </div>
              <StatusBadge status={user.status} />
            </div>
            {/* Bottom row: role + joined — stacks on tiny screens */}
            <div className="mt-2.5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <RoleBadge role={user.role} />
              <p className="text-xs text-slate-400 dark:text-slate-500">Joined {user.joined}</p>
            </div>
            {/* Actions */}
            <div className="mt-2.5 flex gap-4 border-t border-slate-100 pt-2.5 dark:border-slate-700">
              <button type="button" className="text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Edit</button>
              <button type="button" className="text-xs text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table — shown from md up */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 text-sm">
            <thead className="border-b border-slate-200 dark:border-slate-700">
              <tr className="text-left text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="px-4 py-3 font-medium lg:px-6 lg:py-4">User</th>
                <th className="px-4 py-3 font-medium lg:px-6 lg:py-4">Role</th>
                <th className="px-4 py-3 font-medium lg:px-6 lg:py-4">Status</th>
                <th className="px-4 py-3 font-medium lg:px-6 lg:py-4">Joined</th>
                <th className="px-4 py-3 font-medium lg:px-6 lg:py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {USERS.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50 dark:border-slate-700/50 dark:hover:bg-slate-700/30">
                  <td className="px-4 py-3 lg:px-6 lg:py-4">
                    <div className="flex items-center gap-3">
                      <Avatar user={user} />
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 lg:px-6 lg:py-4"><RoleBadge role={user.role} /></td>
                  <td className="px-4 py-3 lg:px-6 lg:py-4"><StatusBadge status={user.status} /></td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400 lg:px-6 lg:py-4">{user.joined}</td>
                  <td className="px-4 py-3 lg:px-6 lg:py-4">
                    <div className="flex gap-3">
                      <button type="button" className="text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Edit</button>
                      <button type="button" className="text-xs text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">Remove</button>
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
