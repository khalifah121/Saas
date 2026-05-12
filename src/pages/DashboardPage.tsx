export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-4 sm:gap-4 sm:p-8">
      <h1 className="text-center text-xl font-bold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
        Welcome back, Africa Works!
      </h1>
      <p className="max-w-sm text-center text-sm text-slate-500 dark:text-slate-400 sm:max-w-md sm:text-base">
        You're on the Dashboard. Use the sidebar to navigate to Analytics, Users, Settings, and more.
      </p>
    </div>
  );
}
