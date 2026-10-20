'use client';
import { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Centered modal overlay.
 * Props: open, onClose, title, children, size ('sm'|'md'|'lg')
 */
export default function Modal({ open, onClose, title, children, size = 'md' }) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div className={`relative w-full ${widths[size]} bg-white dark:bg-gray-900
        rounded-2xl shadow-2xl border border-line dark:border-gray-800 z-10`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4
          border-b border-line dark:border-gray-800">
          <h2 className="text-base font-semibold text-ink dark:text-gray-100">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:bg-sky dark:hover:bg-gray-800
              hover:text-ink transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        {/* Body */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
