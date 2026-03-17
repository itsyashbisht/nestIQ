export default function Loader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                {/* Spinning ring */}
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-[#E07B39]/20"/>
                    <div
                        className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#E07B39] animate-spin"/>
                </div>
                <p
                    className="text-sm font-medium text-black/40 tracking-wider"
                    style={{fontFamily: "Mona Sans, Inter, sans-serif"}}
                >
                    NestIQ
                </p>
            </div>
        </div>
    );
}