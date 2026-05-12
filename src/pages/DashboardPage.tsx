export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 sm:p-8">
      <h1 className="text-center text-2xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        Welcome back, Africa Works!
      </h1>
      <p className="max-w-md text-center text-sm text-slate-500 dark:text-slate-400 sm:text-base">
        You're on the Dashboard. Use the sidebar to navigate to Analytics, Users, Settings, and more.
      </p>
    </div>
  );
}
