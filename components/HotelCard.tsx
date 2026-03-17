import Image from "next/image";
import Link from "next/link";
import {MapPin, Star} from "lucide-react";
import type {IHotel} from "@/src/types";

interface Props {
    hotel: IHotel;
}

export default function HotelCard({hotel}: Props) {
    return (
        <Link href={`/hotels/${hotel.slug}`} className="group block">
            <div
                className="bg-white rounded-2xl overflow-hidden border border-[#e8e8e4] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                        src={
                            hotel.images?.[0]?.url ??
                            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600"
                        }
                        alt={hotel.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
            <span
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm text-white capitalize">
              {hotel.category}
            </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3
                        className="text-[#0f0f0f] text-base mb-1 group-hover:text-[#E07B39] transition-colors truncate"
                        style={{
                            fontFamily: "Mona Sans, Inter, sans-serif",
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        {hotel.name}
                    </h3>

                    <div className="flex items-center gap-1 text-xs text-[#999] mb-3">
                        <MapPin size={12}/>
                        {hotel.city}, {hotel.state}
                    </div>

                    {/* Vibes */}
                    <div className="flex flex-wrap gap-1 mb-3">
                        {hotel.vibes.slice(0, 2).map((vibe) => (
                            <span
                                key={vibe}
                                className="px-2 py-0.5 rounded-full text-xs bg-[#F5F4EF] text-[#666] border border-[#e8e8e4] capitalize"
                            >
                {vibe}
              </span>
                        ))}
                    </div>

                    {/* Rating + Price */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <Star size={13} className="fill-[#E07B39] text-[#E07B39]"/>
                            <span className="text-sm font-semibold text-[#0f0f0f]">
                {hotel.rating}
              </span>
                            <span className="text-xs text-[#bbb]">({hotel.reviewCount})</span>
                        </div>
                        <div>
              <span
                  className="font-bold text-[#0f0f0f] text-base"
                  style={{fontFamily: "Mona Sans, Inter, sans-serif"}}
              >
                ₹{hotel.pricePerNight.toLocaleString("en-IN")}
              </span>
                            <span className="text-xs text-[#aaa]">/night</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}