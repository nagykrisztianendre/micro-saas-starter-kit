import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Micro-SaaS Starter Kit',
  description:
    'Production-ready Micro-SaaS template with authentication, billing, dashboard and deploy automation.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
