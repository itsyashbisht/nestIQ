import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NestIQ – AI-Curated Luxury Stays',
  description:
    "Beyond luxury, we curate emotional resonance. Experience the world's most intimate retreats through our AI-guided discovery platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
