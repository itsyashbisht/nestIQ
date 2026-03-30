"use client";

import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import SessionProvider from "@/components/SessionProvider";

// Wrap in its own component so layout.tsx stays a Server Component
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <SessionProvider>{children}</SessionProvider>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                theme="light"
            />
        </Provider>
    );
}
