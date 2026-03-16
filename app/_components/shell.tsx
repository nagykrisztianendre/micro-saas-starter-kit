import Link from 'next/link';
import type { ReactNode } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/billing', label: 'Billing' },
  { href: '/organizations', label: 'Organizations' },
  { href: '/settings/api-keys', label: 'API Keys' },
  { href: '/admin', label: 'Admin' },
  { href: '/admin/audit-logs', label: 'Audit Logs' },
];

export function AppShell({ title, description, children, notice }: { title: string; description?: string; children: ReactNode; notice?: string }) {
  return (
    <main className="page">
      <header className="header">
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </header>
      <nav className="nav">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/logout">Log out</Link>
      </nav>
      {notice ? <p className="notice">{notice}</p> : null}
      <section>{children}</section>
    </main>
  );
}

export function AuthShell({ title, children, footer }: { title: string; children: ReactNode; footer: ReactNode }) {
  return (
    <main className="page narrow">
      <header className="header">
        <h1>{title}</h1>
      </header>
      <section>{children}</section>
      <footer>{footer}</footer>
    </main>
  );
}
