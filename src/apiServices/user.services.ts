import REQUEST from "./axios";
import ROUTES from "../constants/routes.json";

interface UpdateDetailsPayload {
    username: string;
    fullname: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: number;
    phoneNumber: number;
}

export const userService = {
    getMe() {
        return REQUEST.get(ROUTES.USER.GET_ME);
    },

    updateDetails(payload: UpdateDetailsPayload) {
        return REQUEST.post(ROUTES.USER.UPDATE_DETAILS, payload);
    },

    getAllUsers() {
        return REQUEST.get(ROUTES.USER.GET_ALL_USERS);
    },
};