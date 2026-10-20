import { Inbox } from 'lucide-react';

export default function EmptyState({ message = 'No records found.', action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
      <Inbox size={40} className="text-muted/40" />
      <p className="text-sm text-muted dark:text-gray-400">{message}</p>
      {action}
    </div>
  );
}
