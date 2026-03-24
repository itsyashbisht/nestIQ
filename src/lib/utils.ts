import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

//  Tailwind class merger (same as your Solemate utils.js)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//  Price formatting
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceShort(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
}

// Date helpers
export function formatDate(date: string | Date, fmt: 'short' | 'long' = 'short'): string {
  const d = new Date(date);
  if (fmt === 'long') {
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

//  Booking cost
export const GST_RATE = 0.12;

export function calculateBookingTotal(pricePerNight: number, nights: number) {
  const subtotal = pricePerNight * nights;
  const taxes = Math.round(subtotal * GST_RATE);
  const total = subtotal + taxes;
  return { subtotal, taxes, total };
}

//  Rating label
export function getRatingLabel(rating: number): string {
  if (rating >= 4.8) return 'Exceptional';
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4.0) return 'Very Good';
  if (rating >= 3.5) return 'Good';
  return 'Satisfactory';
}

//  Slug generator
export function generateSlug(name: string, city: string): string {
  return `${name}-${city}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

//  Truncate
export function truncate(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max).trim()}…`;
}
