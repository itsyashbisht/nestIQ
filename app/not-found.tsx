import Link from 'next/link';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import Navbar from '@/components/layouts/Navigation';
import Footer from '@/components/layouts/Footer';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--surface)' }}>
      <Navbar />

      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, var(--secondary), transparent)' }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, var(--on-surface), transparent)' }}
          />
        </div>

        <div className="relative z-10 max-w-xl mx-auto px-6 text-center py-20">
          {/* Error code */}
          <p className="section-label mb-6">Error Code 404</p>

          {/* Giant 404 */}
          <h1
            className="font-poppins font-black leading-none mb-4 select-none"
            style={{
              fontSize: 'clamp(100px, 20vw, 180px)',
              letterSpacing: '-0.06em',
              color: 'transparent',
              WebkitTextStroke: '2px var(--surface-container-high)',
            }}
          >
            404
          </h1>

          <h2
            className="font-poppins font-bold text-2xl text-on-surface mb-3"
            style={{ letterSpacing: '-0.02em' }}
          >
            The path has gone quiet.
          </h2>
          <p className="text-primary leading-relaxed mb-10 max-w-sm mx-auto text-sm">
            The destination you seek is currently unavailable or has been moved to a private
            collection. Allow us to guide you back.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link href="/" className="btn-primary">
              Return Home <ArrowRight size={15} />
            </Link>
            <Link href="/search" className="btn-secondary flex items-center gap-2">
              <Search size={15} /> Discover Elsewhere
            </Link>
          </div>

          {/* AI Suggestion */}
          <div
            className="rounded-xl p-5 border-l-4 text-left max-w-sm mx-auto"
            style={{ borderColor: 'var(--secondary)', background: 'var(--surface-container-low)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-secondary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Concierge Suggestion
              </span>
            </div>
            <p className="text-sm text-primary leading-relaxed">
              Our Intelligence suggests exploring the Amalfi Journeys collection while we relocate
              this page.
            </p>
            <Link
              href="/search?vibe=coastal"
              className="flex items-center gap-1.5 text-xs font-semibold text-secondary mt-3 hover:underline"
            >
              Explore Amalfi Collection <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
