import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function NotFound() {
    return (
        <>
            <Navigation/>
            <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4 pt-20">
                <div className="text-center">
                    <p
                        className="text-8xl font-black text-[#0f0f0f]/10 mb-4"
                        style={{fontFamily: "Mona Sans, Inter, sans-serif"}}
                    >
                        404
                    </p>
                    <h1
                        className="text-2xl font-bold text-[#0f0f0f] mb-2"
                        style={{fontFamily: "Mona Sans, Inter, sans-serif"}}
                    >
                        Page not found
                    </h1>
                    <p className="text-[#666] text-sm mb-8">
                        This page doesn&apos;t exist or has been moved.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <Link href="/public" className="btn-brand">
                            Go Home
                        </Link>
                        <Link
                            href="/search"
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#e6e4df] text-sm font-medium text-[#666] hover:border-[#E07B39] hover:text-[#E07B39] transition-colors"
                        >
                            Search Hotels
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}