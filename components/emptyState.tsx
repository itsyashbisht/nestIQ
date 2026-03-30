// ── EmptyState ────────────────────────────────────────────────────────────────
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {icon && <div className="mb-4 text-4xl">{icon}</div>}
      <h3 className="font-poppins font-semibold text-lg text-on-surface mb-2">{title}</h3>
      {description && <p className="text-sm text-primary max-w-sm mb-6">{description}</p>}
      {action}
    </div>
  );
}
