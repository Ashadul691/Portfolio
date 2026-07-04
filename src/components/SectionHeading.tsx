export default function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12">
      <p className="font-mono text-sm text-accent mb-2">{`// ${index}`}</p>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold">{title}</h2>
      {subtitle && <p className="mt-3 text-muted max-w-2xl">{subtitle}</p>}
    </div>
  );
}
