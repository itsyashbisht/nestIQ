"use client";

import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@/src/store";
import {getMe} from "@/src/thunks/user.thunk";
import {setInitialized} from "@/src/slices/auth.slice";
import Loader from "./Loader";

interface Props {
    children: React.ReactNode;
}

export default function SessionProvider({children}: Props) {
    const dispatch = useDispatch<AppDispatch>();

    const {isInitialized, isAuthenticated, user} = useSelector(
        (state: RootState) => state.auth
    );

    // RESTORE SESSION ON MOUNT — same logic as your Solemate AppLayout
    useEffect(() => {
        const token =
            typeof window !== "undefined"
                ? localStorage.getItem("accessToken")
                : null;

        if (token && !user) {
            // Token exists but no user in state — fetch profile
            dispatch(getMe());
        } else {
            // No token — mark initialized so route guards don't wait
            dispatch(setInitialized());
        }
    }, []); // runs once on mount

    // Show loader while session is being restored
    if (!isInitialized) {
        return <Loader/>;
    }

    return <>{children}</>;
}