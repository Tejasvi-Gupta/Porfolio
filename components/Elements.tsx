export function External({
  url,
  label,
  className = "",
}: {
  url: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={url}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}
export function Chips({ values }: { values: string[] }) {
  return (
    <div className="chips">
      {values.map((value) => (
        <span className="chip" key={value}>
          {value}
        </span>
      ))}
    </div>
  );
}
