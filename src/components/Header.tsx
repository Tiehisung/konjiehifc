export default function Header({
  subtitle,
  title,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <header className="border-b border-border bg-card grow">
      <div className=" mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-1">{subtitle}</p>
      </div>
    </header>
  );
}
