import REQUEST from "./axios";
import ROUTES from "../constants/routes.json";
import type { SearchFilters } from "../types";

export const hotelService = {
    // GET all hotels with optional filters
    getAllHotels(filters?: SearchFilters) {
        return REQUEST.get(ROUTES.HOTEL.GET_ALL, { params: filters });
    },

    // GET hotel by MongoDB _id
    getHotelById(hotelId: string) {
        return REQUEST.get(ROUTES.HOTEL.GET_BY_ID.replace(":hotelId", hotelId));
    },

    // GET hotel by slug (used on detail page)
    getHotelBySlug(slug: string) {
        return REQUEST.get(ROUTES.HOTEL.GET_BY_SLUG.replace(":slug", slug));
    },

    // AI natural language search — POST with query string
    searchHotels(query: string, filters?: SearchFilters) {
        return REQUEST.post(ROUTES.HOTEL.SEARCH, { query, filters });
    },

    // OWNER: create hotel
    createHotel(payload: FormData) {
        return REQUEST.post(ROUTES.HOTEL.CREATE, payload, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    },

    // OWNER: update hotel
    updateHotel(hotelId: string, payload: Partial<Record<string, unknown>>) {
        return REQUEST.patch(
            ROUTES.HOTEL.UPDATE.replace(":hotelId", hotelId),
            payload
        );
    },

    // ADMIN: delete hotel
    deleteHotel(hotelId: string) {
        return REQUEST.delete(ROUTES.HOTEL.DELETE.replace(":hotelId", hotelId));
    },
};