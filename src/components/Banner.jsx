"use client";

import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { fetchExploreContent } from "@/lib/api";
import { usePetStore } from "@/store/petStore";

export default function Banner() {
  const petType = usePetStore((state) => state.petType);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchExploreContent({ featured: true, petType: petType || "dog" })
      .then((content) => {
        if (cancelled) return;
        const mapped = (content || [])
          .filter((item) => item.image)
          .slice(0, 5)
          .map((item) => ({
            image: item.image,
            title: item.category ? `Furrmaa ${item.category}` : "Furrmaa",
            heading: item.title || "Pet Care",
            subHeading: "",
            description: item.description || "",
            button: "EXPLORE →",
          }));
        setSlides(mapped);
      })
      .catch(() => {
        if (!cancelled) setSlides([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [petType]);

  const banners = useMemo(() => slides, [slides]);

  if (loading) {
    return (
      <div className="w-full flex justify-center px-4 pt-6">
        <div className="w-full max-w-7xl min-h-[380px] md:min-h-[450px] rounded-2xl bg-gray-100 animate-pulse" />
      </div>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex justify-center px-4 pt-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop
        className="w-full max-w-7xl"
      >
        {banners.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="
                relative w-full
                min-h-[380px] md:min-h-[450px]
                rounded-2xl overflow-hidden
                bg-cover bg-right md:bg-center bg-no-repeat
                flex items-center
              "
              style={{ backgroundImage: `url(${item.image})` }}
            >
              {/* Mobile blur overlay */}
              <div className="absolute inset-0 backdrop-blur-sm md:hidden" />

              <div className="relative z-10 w-full md:w-1/2 px-6 md:px-14 text-center md:text-left space-y-4">
                <p className="text-lg font-bold text-black">
                  {item.title}
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black">
                  {item.heading}
                  <br />
                  {item.subHeading}
                </h1>

                <p className="text-sm md:text-base text-black/70 max-w-md mx-auto md:mx-0">
                  {item.description}
                </p>

                <button className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition">
                  {item.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
