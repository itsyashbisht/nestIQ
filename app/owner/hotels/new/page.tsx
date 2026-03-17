'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Globe, Hotel, Loader2, Sparkles, Tag } from 'lucide-react';
import { toast } from 'react-toastify';
import Navigation from '../../../../components/Navigation';
import Footer from '../../../../components/Footer';
import { aiService } from '@/src/apiServices/ai.services';

export default function NewHotelPage() {
  const router = useRouter();

  const [description, setDescription] = useState('');
  const [generated, setGenerated] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'input' | 'review' | 'done'>('input');

  async function handleGenerate() {
    if (description.trim().length < 30) {
      toast.error('Please write at least 30 characters about your property.');
      return;
    }
    setLoading(true);
    try {
      const res = await aiService.generateListing(description);
      setGenerated(res.data);
      setStep('review');
    } catch {
      toast.error('Listing generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      // In real app: call hotel.service.createHotel with the generated data + form fields
      await new Promise((r) => setTimeout(r, 1500)); // Simulate API call
      toast.success('Hotel listing submitted for review!');
      setStep('done');
    } catch {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navigation />
      <div style={{ minHeight: '100vh', background: '#F7F6F2', paddingTop: 68 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '2.5rem 2rem 5rem' }}>
          <Link
            href="/owner/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.8125rem',
              color: '#888',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '1.5rem',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>

          {/* Step: Input */}
          {step === 'input' && (
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    background: 'rgba(224,123,57,0.08)',
                    border: '1px solid rgba(224,123,57,0.18)',
                    borderRadius: 9999,
                    padding: '0.3rem 0.9rem',
                    marginBottom: '0.6rem',
                  }}
                >
                  <Sparkles size={13} color="#E07B39" />
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#E07B39',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    AI Listing Creator
                  </span>
                </div>
                <h1
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#111',
                    letterSpacing: '-0.025em',
                    marginBottom: '0.5rem',
                  }}
                >
                  List Your Property
                </h1>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#777',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.7,
                  }}
                >
                  Describe your property in plain words. Our AI will craft a professional,
                  SEO-optimised hotel listing — name, description, amenities, highlights, and more.
                </p>
              </div>

              <div
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  border: '1px solid #E8E6E1',
                  padding: '2rem',
                }}
              >
                <label className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
                  Describe your property
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  placeholder="Example: I have a boutique homestay in Coorg surrounded by coffee plantations. It has 4 rooms with valley views, a private plunge pool, serves authentic Kodava cuisine, and is perfect for couples or small families. It's about 15 minutes from Abbey Falls and Raja's Seat. We offer plantation walks, bonfire evenings, and bird watching..."
                  style={{
                    width: '100%',
                    border: '1.5px solid #E8E6E1',
                    borderRadius: 12,
                    padding: '1rem',
                    fontSize: '0.9rem',
                    fontFamily: 'Inter, sans-serif',
                    color: '#111',
                    lineHeight: 1.7,
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '0.75rem',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: description.length < 30 ? '#E07B39' : '#bbb',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {description.length} characters{' '}
                    {description.length < 30 ? `(${30 - description.length} more needed)` : '✓'}
                  </p>
                  <button
                    onClick={handleGenerate}
                    disabled={loading || description.trim().length < 30}
                    className="btn-brand"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '0.75rem 1.5rem',
                      borderRadius: 12,
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />{' '}
                        Generating…
                      </>
                    ) : (
                      <>
                        <Sparkles size={15} /> Generate Listing
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div
                style={{
                  marginTop: '1.5rem',
                  background: '#fff',
                  borderRadius: 16,
                  border: '1px solid #E8E6E1',
                  padding: '1.25rem 1.5rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#111',
                    marginBottom: '0.75rem',
                  }}
                >
                  Tips for a great listing
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    'Mention the exact location (city, neighbourhood, or landmark)',
                    'Describe the type of property (homestay, resort, boutique hotel...)',
                    'Include key amenities (pool, spa, restaurant, views...)',
                    "Tell us who it's best for (couples, families, solo travelers...)",
                    'Add nearby attractions or unique experiences you offer',
                  ].map((tip) => (
                    <li
                      key={tip}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        fontSize: '0.8rem',
                        color: '#666',
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: '#E07B39',
                          flexShrink: 0,
                          marginTop: 7,
                        }}
                      />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Step: Review generated listing */}
          {step === 'review' && generated && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '2rem',
                }}
              >
                <div>
                  <h1
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#111',
                      letterSpacing: '-0.025em',
                    }}
                  >
                    Review Your Listing
                  </h1>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: '#888',
                      fontFamily: 'Inter, sans-serif',
                      marginTop: 4,
                    }}
                  >
                    AI has generated your listing. Review and edit before submitting.
                  </p>
                </div>
                <button
                  onClick={() => setStep('input')}
                  style={{
                    background: 'none',
                    border: '1px solid #E8E6E1',
                    borderRadius: 9999,
                    padding: '0.5rem 1rem',
                    fontSize: '0.8rem',
                    fontFamily: 'Inter, sans-serif',
                    color: '#555',
                    cursor: 'pointer',
                  }}
                >
                  ← Edit Description
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Name + Category */}
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 18,
                    border: '1px solid #E8E6E1',
                    padding: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: '0.5rem',
                    }}
                  >
                    <Hotel size={15} color="#E07B39" />
                    <p className="eyebrow">Property Name & Category</p>
                  </div>
                  <h2
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#111',
                      marginBottom: 8,
                    }}
                  >
                    {generated.name}
                  </h2>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 9999,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      background: '#F5F5F5',
                      color: '#555',
                      fontFamily: 'Inter, sans-serif',
                      textTransform: 'capitalize',
                    }}
                  >
                    {generated.category}
                  </span>
                </div>

                {/* Description */}
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 18,
                    border: '1px solid #E8E6E1',
                    padding: '1.5rem',
                  }}
                >
                  <p className="eyebrow" style={{ display: 'block', marginBottom: '0.75rem' }}>
                    Description
                  </p>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: '#444',
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: 1.75,
                    }}
                  >
                    {generated.description}
                  </p>
                </div>

                {/* Highlights */}
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 18,
                    border: '1px solid #E8E6E1',
                    padding: '1.5rem',
                  }}
                >
                  <p className="eyebrow" style={{ display: 'block', marginBottom: '0.875rem' }}>
                    Top Highlights
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {generated.highlights?.map((h: string, i: number) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <Check size={15} color="#1a9e5a" style={{ flexShrink: 0, marginTop: 2 }} />
                        <p
                          style={{
                            fontSize: '0.875rem',
                            color: '#333',
                            fontFamily: 'Inter, sans-serif',
                            lineHeight: 1.6,
                          }}
                        >
                          {h}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 18,
                    border: '1px solid #E8E6E1',
                    padding: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: '0.875rem',
                    }}
                  >
                    <Tag size={14} color="#E07B39" />
                    <p className="eyebrow">Amenities</p>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {generated.amenities?.map((a: string) => (
                      <span
                        key={a}
                        style={{
                          padding: '0.3rem 0.875rem',
                          borderRadius: 9999,
                          fontSize: '0.78rem',
                          fontWeight: 500,
                          border: '1px solid #E8E6E1',
                          color: '#444',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Vibes */}
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 18,
                    border: '1px solid #E8E6E1',
                    padding: '1.5rem',
                  }}
                >
                  <p className="eyebrow" style={{ display: 'block', marginBottom: '0.875rem' }}>
                    Best For
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {generated.vibes?.map((v: string) => (
                      <span
                        key={v}
                        style={{
                          padding: '0.3rem 0.875rem',
                          borderRadius: 9999,
                          fontSize: '0.78rem',
                          fontWeight: 500,
                          background: 'rgba(224,123,57,0.08)',
                          border: '1px solid rgba(224,123,57,0.2)',
                          color: '#E07B39',
                          fontFamily: 'Inter, sans-serif',
                          textTransform: 'capitalize',
                        }}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SEO */}
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 18,
                    border: '1px solid #E8E6E1',
                    padding: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: '0.875rem',
                    }}
                  >
                    <Globe size={14} color="#E07B39" />
                    <p className="eyebrow">SEO Meta</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <p style={{ fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                      <span style={{ color: '#aaa' }}>Title:</span>{' '}
                      <span style={{ color: '#111' }}>{generated.seoTitle}</span>
                    </p>
                    <p style={{ fontSize: '0.8rem', fontFamily: 'Inter, sans-serif' }}>
                      <span style={{ color: '#aaa' }}>Description:</span>{' '}
                      <span style={{ color: '#555' }}>{generated.seoDescription}</span>
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-dark"
                  style={{
                    justifyContent: 'center',
                    padding: '1rem',
                    borderRadius: 14,
                    fontSize: '0.9375rem',
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />{' '}
                      Submitting…
                    </>
                  ) : (
                    'Submit for Review →'
                  )}
                </button>
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: '#bbb',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Our team reviews all listings within 24–48 hours.
                </p>
              </div>
            </div>
          )}

          {/* Step: Done */}
          {step === 'done' && (
            <div
              style={{
                background: '#fff',
                borderRadius: 24,
                border: '1px solid #E8E6E1',
                padding: '4rem 2rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(26,158,90,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                }}
              >
                <Check size={28} color="#1a9e5a" />
              </div>
              <h2
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.375rem',
                  fontWeight: 700,
                  color: '#111',
                  marginBottom: '0.75rem',
                }}
              >
                Listing Submitted!
              </h2>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#777',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: 1.7,
                  maxWidth: 400,
                  margin: '0 auto 2rem',
                }}
              >
                Your listing has been submitted for review. We&apos;ll get back to you within 24–48
                hours. You can track the status in your dashboard.
              </p>
              <Link href="/owner/dashboard" className="btn-dark" style={{ display: 'inline-flex' }}>
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
