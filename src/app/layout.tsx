import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/providers/AppProviders';
import { getUser } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Fight Link',
  description:
    'Fight Link connects martial arts athletes and fans with gyms, events, and competitions across Serbia.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders user={user}>{children}</AppProviders>
      </body>
    </html>
  );
}
