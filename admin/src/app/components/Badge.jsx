/**
 * Status badge component.
 * variant: 'pending'|'approved'|'rejected'|'info_requested'|
 *          'published'|'draft'|'unread'|'read'|'replied'|'success'|'warning'
 */
const VARIANTS = {
  pending:       'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  approved:      'bg-green-100  text-green-800  dark:bg-green-900/30  dark:text-green-300',
  rejected:      'bg-red-100    text-red-800    dark:bg-red-900/30    dark:text-red-300',
  info_requested:'bg-blue-100   text-blue-800   dark:bg-blue-900/30   dark:text-blue-300',
  published:     'bg-green-100  text-green-800  dark:bg-green-900/30  dark:text-green-300',
  draft:         'bg-gray-100   text-gray-600   dark:bg-gray-800      dark:text-gray-400',
  unread:        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  read:          'bg-gray-100   text-gray-600   dark:bg-gray-800      dark:text-gray-400',
  replied:       'bg-green-100  text-green-800  dark:bg-green-900/30  dark:text-green-300',
  success:       'bg-green-100  text-green-800  dark:bg-green-900/30  dark:text-green-300',
  warning:       'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  active:        'bg-green-100  text-green-800  dark:bg-green-900/30  dark:text-green-300',
  inactive:      'bg-gray-100   text-gray-600   dark:bg-gray-800      dark:text-gray-400',
};

export default function Badge({ variant = 'draft', children }) {
  const cls = VARIANTS[variant] || VARIANTS.draft;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {children}
    </span>
  );
}
