import type { Metadata } from 'next';
import Providers from '@/src/Provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'NestIQ — Find Your Perfect Stay Across India',
  description: 'AI-powered hotel discovery. Describe what you want, NestIQ finds the perfect stay.',
  openGraph: {
    title: 'NestIQ',
    description: 'AI-powered hotel discovery across India',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
