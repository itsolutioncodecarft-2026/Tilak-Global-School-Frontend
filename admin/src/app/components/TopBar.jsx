'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sun, Moon, LogOut, Bell, User } from 'lucide-react';
import { useAuth } from '@/app/AuthContext';
import toast from 'react-hot-toast';

const LABELS = {
  '':          'Dashboard',
  admissions:  'Admissions',
  content:     'Content',
  gallery:     'Gallery',
  news:        'News & Events',
  documents:   'Documents',
  fees:        'Fee Structure',
  faqs:        'FAQs',
  contact:     'Contact',
  settings:    'Settings',
  users:       'Users',
  login:       'Login',
};

export default function TopBar({ dark, onToggleDark }) {
  const { user, logout } = useAuth();
  const router   = useRouter();
  const pathname = usePathname();
  const [profileOpen, setProfileOpen]   = useState(false);
  const [notifOpen,   setNotifOpen]     = useState(false);
  const [notifs,      setNotifs]        = useState([]);
  const [unreadCount, setUnreadCount]   = useState(0);

  // Build breadcrumb — in standalone app paths are /admissions, /gallery etc.
  const parts   = pathname.split('/').filter(Boolean);
  const current = parts[parts.length - 1] || '';
  const label   = LABELS[current] ?? current;

  // Load recent notifications from activity log on mount
  useEffect(() => {
    if (!user) return;
    fetch('/api/admin/dashboard/activity?limit=5', { credentials: 'include' })
      .then(r => r.json())
      .then(d => {
        const items = d.data?.activity || [];
        setNotifs(items);
        setUnreadCount(items.length > 0 ? 1 : 0); // show dot if any activity
      })
      .catch(() => {});
  }, [user, pathname]); // refresh on page change

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    toast.success('Logged out');
    router.replace('/login');
  };

  const ACTION_COLORS = {
    login: 'text-green-500', logout: 'text-gray-400',
    create: 'text-blue-500', update: 'text-yellow-500',
    delete: 'text-red-500', publish: 'text-green-500',
    unpublish: 'text-orange-500', status_change: 'text-purple-500',
    upload: 'text-blue-400',
  };

  return (
    <header className="h-14 flex items-center justify-between px-5 shrink-0
      bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm z-20">

      {/* Breadcrumb */}
      <div>
        <p className="text-sm font-semibold text-ink dark:text-gray-100 capitalize">{label}</p>
        <p className="text-xs text-muted dark:text-gray-400">Tilak Global School Admin</p>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1">

        {/* Dark / Light toggle */}
        <button
          onClick={onToggleDark}
          title={dark ? 'Switch to Light mode' : 'Switch to Dark mode'}
          className="p-2 rounded-lg transition-colors
            text-muted hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          aria-label="Toggle dark mode"
        >
          {dark
            ? <Sun  size={18} className="text-yellow-400" />
            : <Moon size={18} />
          }
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(o => !o); setUnreadCount(0); setProfileOpen(false); }}
            className="relative p-2 rounded-lg transition-colors
              text-muted hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <p className="text-xs font-semibold text-ink dark:text-gray-100">Recent Activity</p>
                  <span className="text-xs text-muted dark:text-gray-400">{notifs.length} items</span>
                </div>
                {notifs.length === 0 ? (
                  <p className="text-xs text-muted dark:text-gray-400 px-4 py-6 text-center">No recent activity</p>
                ) : (
                  <ul className="max-h-72 overflow-y-auto">
                    {notifs.map((n, i) => (
                      <li key={n._id || i}
                        className="flex items-start gap-3 px-4 py-3
                          border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                        <div className="w-6 h-6 rounded-full bg-navy/10 dark:bg-navy/30
                          flex items-center justify-center shrink-0 mt-0.5">
                          <Bell size={11} className="text-navy dark:text-blue-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-ink dark:text-gray-200 truncate">
                            <span className="font-medium">{n.adminName}</span>
                            {' '}
                            <span className={ACTION_COLORS[n.action] || 'text-muted'}>
                              {n.action?.replace(/_/g, ' ')}
                            </span>
                            {' in '}{n.module}
                          </p>
                          {n.detail && (
                            <p className="text-xs text-muted dark:text-gray-500 truncate mt-0.5">{n.detail}</p>
                          )}
                          <p className="text-xs text-muted dark:text-gray-500 mt-0.5">
                            {new Date(n.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <div className="relative ml-1">
          <button
            onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl
              hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {user?.name?.[0]?.toUpperCase() || 'A'}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-ink dark:text-gray-100 leading-none">
                {user?.name || 'Admin'}
              </p>
              <p className="text-xs text-muted dark:text-gray-400 capitalize leading-none mt-0.5">
                {user?.role?.replace(/_/g, ' ')}
              </p>
            </div>
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20 py-1">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-semibold text-ink dark:text-gray-100">{user?.name}</p>
                  <p className="text-xs text-muted dark:text-gray-400">{user?.email}</p>
                </div>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2.5 text-sm
                    text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                  <LogOut size={15} /> Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

