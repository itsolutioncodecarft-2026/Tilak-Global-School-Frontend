'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';
import {
  LayoutDashboard, Users, FileText, Image, Newspaper,
  Download, DollarSign, HelpCircle, Settings, Mail,
  GraduationCap, ChevronLeft, ChevronRight,
} from 'lucide-react';

const NAV = [
  { href: '/',             label: 'Dashboard',       icon: LayoutDashboard, perm: null },
  { href: '/admissions',   label: 'Admissions',      icon: GraduationCap,   perm: ['admissions','view'] },
  { href: '/content',      label: 'Content',         icon: FileText,        perm: ['content','view'] },
  { href: '/gallery',      label: 'Gallery',         icon: Image,           perm: ['gallery','view'] },
  { href: '/news',         label: 'News & Events',   icon: Newspaper,       perm: ['news','view'] },
  { href: '/documents',    label: 'Documents',       icon: Download,        perm: ['documents','view'] },
  { href: '/fees',         label: 'Fee Structure',   icon: DollarSign,      perm: ['fees','view'] },
  { href: '/faqs',         label: 'FAQs',            icon: HelpCircle,      perm: ['faqs','view'] },
  { href: '/contact',      label: 'Contact',         icon: Mail,            perm: ['contactEnquiries','view'] },
  { href: '/settings',     label: 'Settings',        icon: Settings,        perm: ['settings','view'] },
  { href: '/users',        label: 'Users',           icon: Users,           perm: ['userManagement','view'] },
];

export default function Sidebar({ collapsed, onToggle }) {
  const pathname = usePathname();
  const { user, can } = useAuth();

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const visible = NAV.filter(item =>
    !item.perm || can(item.perm[0], item.perm[1])
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-30 flex flex-col
        bg-navy text-white transition-all duration-200 shadow-xl
        ${collapsed ? 'w-16' : 'w-60'}`}
    >
      {/* Logo / brand */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-navy-2 min-h-[64px]`}>
        <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0 text-white font-bold text-xs">
          TGS
        </div>
        {!collapsed && (
          <span className="font-heading text-sm font-semibold leading-tight truncate">
            Tilak Global<br />
            <span className="text-gold text-xs font-normal">Admin Panel</span>
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {visible.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            title={collapsed ? label : undefined}
            className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium
              transition-colors duration-150 group
              ${isActive(href)
                ? 'bg-navy-2 text-white'
                : 'text-white/70 hover:bg-navy-2 hover:text-white'
              }`}
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </Link>
        ))}
      </nav>

      {/* User info + collapse button */}
      <div className="border-t border-navy-2 p-2 space-y-2">
        {!collapsed && user && (
          <div className="px-2 py-1">
            <p className="text-xs text-white/50 truncate">{user.email}</p>
            <p className="text-xs text-gold capitalize">{user.role?.replace('_', ' ')}</p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg
            text-white/60 hover:text-white hover:bg-navy-2 transition-colors text-xs"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight size={16} />
            : <><ChevronLeft size={16} /><span>Collapse</span></>
          }
        </button>
      </div>
    </aside>
  );
}

