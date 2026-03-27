export type HotelCategory = 'budget' | 'comfort' | 'luxury' | 'boutique';
export type HotelVibe = 'romantic' | 'family' | 'adventure' | 'business' | 'solo' | 'wellness';

export interface IHotelImage {
  url: string;
  public_id: string;
}

export interface IHotel {
  _id: string;
  name: string;
  slug: string;
  description: string;
  city: string;
  state: string;
  address: string;
  coordinates: { lat: number; lng: number };
  images: IHotelImage[];
  amenities: string[];
  category: HotelCategory;
  vibes: HotelVibe[];
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  ownerId: string;
  isActive: boolean;
  nearbyAttractions: string[];
  checkInTime: string;
  checkOutTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllHotelsParams {
  city: string;
  category: HotelCategory;
  vibe: HotelVibe;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  limit: number;
  page: number;
}

export interface CreateHotelRequest {
  name: string;
  slug: string;
  description: string;
  city: string;
  state: string;
  address: string;
  category: HotelCategory;
  vibes: HotelVibe[];
  amenities: string[];
  pricePerNight: number;
  nearbyAttractions: string[];
  checkInTime: string;
  checkOutTime: string;
}

export interface UpdateHotelRequest {
  hotelId: string;
  allowedChanges: {
    name: string;
    description: string;
    city: string;
    state: string;
    address: string;
    category: HotelCategory;
    vibes: HotelVibe[];
    amenities: string[];
    pricePerNigh: number;
    nearbyAttractions: string[];
    checkInTime: string;
    checkOutTime: string;
    isActive: boolean;
  };
}
