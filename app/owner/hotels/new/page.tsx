'use client';
import { useState } from 'react';
import { Bell, Check, Flower, Home, Loader2, Sparkles, Zap } from 'lucide-react';
import Navbar from '@/components/layouts/Navigation';
import Footer from '@/components/layouts/Footer';
import { AIInsight, StepIndicator } from '@/components/index.tsx';

const TIPS = [
  {
    icon: <Home size={16} className="text-secondary" />,
    title: 'Mention Architecture',
    desc: 'Is it Brutalist, Mediterranean, or Minimalist? NestIQ travelers value design intent.',
  },
  {
    icon: <Flower size={16} className="text-secondary" />,
    title: 'Sensory Details',
    desc: 'Describe the scent of the gardens or the texture of the linens. Create a narrative.',
  },
  {
    icon: <Bell size={16} className="text-secondary" />,
    title: 'Exclusive Perks',
    desc: 'Do you offer a private chef, helipad, or rare experiences? Lead with your differentiator.',
  },
];
const STEPS = ['Describe', 'Review', 'Publish'];
const SAMPLE =
  'A serene 19th-century manor in the Western Ghats. Red laterite stone walls, hand-carved teak interiors, and curated art from local artisans. Salt-water infinity pool overlooking a spice plantation, private Ayurvedic wellness pavilion, and a farm-to-table kitchen helmed by a Michelin-trained chef.';

export default function AIListingPage() {
  const [step, setStep] = useState(1);
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [done, setDone] = useState(false);

  const generate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setResult({
      title: 'The Ghats Heritage Manor — A Living Museum of Malabar Luxury',
      tagline: 'Where colonial grandeur meets the untamed spirit of the Western Ghats.',
      description:
        'Emerge into a world where time moves with the rhythm of the spice plantation. This meticulously restored 19th-century manor is not a hotel — it is a breathing artifact of Malabar heritage, reimagined for the discerning modern voyager.',
      tags: 'Heritage, Wellness, Culinary, Nature Immersion',
      mood: 'Quiet Contemplation, Cultural Immersion',
    });
    setStep(2);
    setLoading(false);
  };

  if (done) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--surface)' }}
      >
        <div className="card-editorial p-12 max-w-md w-full mx-6 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'var(--secondary-container)' }}
          >
            <Check size={28} className="text-secondary" />
          </div>
          <h2 className="font-poppins font-black text-2xl text-on-surface mb-2">
            Listing Published!
          </h2>
          <p className="text-sm text-primary mb-6">
            Your property has been submitted for editorial review. Expected: 48–72 hours.
          </p>
          <a href="/dashboard" className="btn-primary w-full block text-center">
            View in Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--surface)' }}>
      <Navbar />
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-10">
            <p className="section-label mb-2">AI Listing Creator</p>
            <h1
              className="font-poppins font-black text-3xl md:text-4xl text-on-surface mb-3"
              style={{ letterSpacing: '-0.03em' }}
            >
              Tell us about your masterpiece.
            </h1>
            <p className="text-primary text-sm max-w-xl">
              Our AI Concierge transforms your raw details into a high-converting, editorial-grade
              listing for the NestIQ elite collection.
            </p>
          </div>
          <div className="mb-8">
            <StepIndicator steps={STEPS} current={step} />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {step === 1 && (
                <>
                  <div className="card-editorial p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-poppins font-semibold text-lg text-on-surface">
                        Property Description
                      </h3>
                      <button
                        onClick={() => setDesc(SAMPLE)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-secondary hover:underline"
                      >
                        <Sparkles size={12} /> Use Example
                      </button>
                    </div>
                    <textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      rows={10}
                      className="input-field resize-none text-sm leading-relaxed"
                      placeholder="Describe your property in rich sensory and architectural detail…"
                    />
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-primary">{desc.length} characters</span>
                      <button
                        onClick={generate}
                        disabled={desc.length < 30 || loading}
                        className="btn-amber gap-2 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={15} className="animate-spin" /> Generating…
                          </>
                        ) : (
                          <>
                            <Zap size={15} /> Generate Listing
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <AIInsight title="Curator's Tips">
                    The highest-performing listings describe at least 3 sensory details, 1
                    architectural concept, and 1 exclusive perk that cannot be found elsewhere.
                  </AIInsight>
                </>
              )}

              {step === 2 && result && (
                <>
                  <div className="card-editorial p-8 space-y-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={16} className="text-secondary" />
                      <h3 className="font-poppins font-semibold text-lg text-on-surface">
                        AI-Generated Listing
                      </h3>
                    </div>
                    {Object.entries(result).map(([key, val]) => (
                      <div key={key}>
                        <label className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
                          {key}
                        </label>
                        {key === 'description' ? (
                          <textarea
                            defaultValue={val}
                            rows={4}
                            className="input-field resize-none text-sm"
                          />
                        ) : (
                          <input type="text" defaultValue={val} className="input-field text-sm" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setStep(1);
                        setResult(null);
                      }}
                      className="btn-secondary flex-1"
                    >
                      Regenerate
                    </button>
                    <button onClick={() => setStep(3)} className="btn-primary flex-1">
                      Looks Good →
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="card-editorial p-8 space-y-6">
                  <h3 className="font-poppins font-semibold text-lg text-on-surface">
                    Ready to Publish
                  </h3>
                  <div
                    className="rounded-xl p-5"
                    style={{ background: 'var(--surface-container-low)' }}
                  >
                    <p className="font-semibold text-on-surface mb-1">{result?.title}</p>
                    <p className="text-sm text-primary">{result?.tagline}</p>
                  </div>
                  <AIInsight title="Pre-Publication Check">
                    Your listing scored 94/100 on our editorial quality index — top 8% of
                    submissions. Adding a nightly rate will accelerate approval.
                  </AIInsight>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-primary mb-1.5 block">
                        Nightly Rate (USD)
                      </label>
                      <input type="number" placeholder="e.g. 850" className="input-field" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-primary mb-1.5 block">
                        Max Guests
                      </label>
                      <input type="number" placeholder="e.g. 4" className="input-field" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="btn-secondary flex-1">
                      Back
                    </button>
                    <button onClick={() => setDone(true)} className="btn-amber flex-1">
                      Publish to NestIQ
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-poppins font-semibold text-sm text-on-surface">Curator's Tips</h3>
              {TIPS.map((tip) => (
                <div key={tip.title} className="card-editorial p-5">
                  <div className="flex items-center gap-2 mb-2">
                    {tip.icon}
                    <h4 className="font-semibold text-sm text-on-surface">{tip.title}</h4>
                  </div>
                  <p className="text-xs text-primary leading-relaxed">{tip.desc}</p>
                </div>
              ))}
              <div className="rounded-xl overflow-hidden h-44">
                <img
                  src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&q=80"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
