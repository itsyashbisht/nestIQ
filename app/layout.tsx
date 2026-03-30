import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/src/Provider';

export const metadata: Metadata = {
  title: 'NestIQ – AI-Curated Luxury Stays',
  description:
    "Beyond luxury, we curate emotional resonance. Experience the world's most intimate retreats through our AI-guided discovery platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
