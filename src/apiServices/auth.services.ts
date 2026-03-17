import REQUEST from "./axios";
import ROUTES from "../constants/routes.json";

interface LoginPayload {
    email: string;
    username: string;
    password: string;
}

interface RegisterPayload {
    username: string;
    fullname: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
    pincode: number;
    phoneNumber: number;
}

interface ChangePasswordPayload {
    curPassword: string;
    newPassword: string;
}

export const authService = {
    register(payload: RegisterPayload) {
        return REQUEST.post(ROUTES.USER.REGISTER, payload);
    },

    login(payload: LoginPayload) {
        return REQUEST.post(ROUTES.USER.LOGIN, payload);
    },

    logout() {
        return REQUEST.post(ROUTES.USER.LOGOUT);
    },

    changePassword(payload: ChangePasswordPayload) {
        return REQUEST.post(ROUTES.USER.CHANGE_PASSWORD, payload);
    },
};