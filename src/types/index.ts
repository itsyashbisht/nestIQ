// User
export type UserRole = "Guest" | "Owner";

export interface IUser {
    _id: string;
    username: string;
    fullname: string;
    email: string;
    phoneNumber: number;
    address: string;
    city: string;
    state: string;
    pincode: number;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

// ─── Hotel ───────────────────────────────────────────────────────
export type HotelCategory = "budget" | "comfort" | "luxury" | "boutique";
export type HotelVibe = "romantic" | "family" | "adventure" | "business" | "solo" | "wellness";

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

// ─── Room ────────────────────────────────────────────────────────
export type RoomType = "standard" | "deluxe" | "suite" | "villa";
export type BedType = "single" | "double" | "king" | "twin";

export interface IRoom {
    _id: string;
    hotelId: string;
    type: RoomType;
    name: string;
    description: string;
    capacity: number;
    bedType: BedType;
    pricePerNight: number;
    images: IHotelImage[];
    amenities: string[];
    totalRooms: number;
    createdAt: string;
    updatedAt: string;
}

// ─── Booking ─────────────────────────────────────────────────────
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface IBooking {
    _id: string;
    guestId: string;
    hotelId: string;
    roomId: string;
    hotel?: IHotel;
    room?: IRoom;
    checkIn: string;
    checkOut: string;
    guests: number;
    nights: number;
    pricePerNight: number;
    subtotal: number;
    taxes: number;
    totalAmount: number;
    status: BookingStatus;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    specialRequests?: string;
    createdAt: string;
    updatedAt: string;
}

// ─── Review ──────────────────────────────────────────────────────
export interface IReview {
    _id: string;
    guestId: string | IUser;
    hotelId: string;
    rating: number;
    comment: string;
    createdAt: string;
}

// ─── Search ──────────────────────────────────────────────────────
export interface SearchFilters {
    query?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    vibe?: HotelVibe;
    category?: HotelCategory;
    amenities?: string[];
    sortBy?: "price_asc" | "price_desc" | "rating" | "relevance";
    page?: number;
    limit?: number;
}

// ─── Cart ────────────────────────────────────────────────────────
export interface ICartItem {
    hotelId: string;
    roomId: string;
    hotel: IHotel;
    room: IRoom;
    checkIn: string;
    checkOut: string;
    guests: number;
    nights: number;
    totalAmount: number;
}

// ─── AI ──────────────────────────────────────────────────────────
export interface IBudgetPlan {
    hotelBudget: number;
    foodBudget: number;
    travelBudget: number;
    totalEstimate: number;
    nights: number;
    tips: string[];
}

export interface IReviewSummary {
    pros: string[];
    cons: string[];
    topHighlight: string;
    overallSentiment: "positive" | "mixed" | "negative";
}

// ─── API Response ─────────────────────────────────────────────────
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    statusCode: number;
}