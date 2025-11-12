export default function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-foreground">
          Financial Tracker
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor your income and expenses
        </p>
      </div>
    </header>
  );
}
