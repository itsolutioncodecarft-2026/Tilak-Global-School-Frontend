/**
 * Reusable page header with title, subtitle, and optional action button area.
 */
export default function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-lg font-semibold text-ink dark:text-gray-100">{title}</h1>
        {subtitle && (
          <p className="text-xs text-muted dark:text-gray-400 mt-0.5">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}
