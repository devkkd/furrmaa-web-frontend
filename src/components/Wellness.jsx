"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { catWellnessData, dogWellnessData } from "@/data/wellness";
import { usePetStore } from "@/store/petStore";
import { fetchAllCategories } from "@/lib/api";
import { AdminImage } from "@/app/admin/components/AdminImage";

function titleToCategory(title) {
  const slug = (title || "").toLowerCase().trim();
  if (slug === "medicine") return "health";
  return slug;
}

/** Map API category to grid item */
function mapCategory(item) {
  const title = item.name || item.title;
  const image = item.image || item.img;
  const slug = item.slug || titleToCategory(title);
  return { title, img: image, slug, _id: item._id };
}

const isOther = (name, slug) => {
  const s = (slug || (name || "").toLowerCase().trim()).toLowerCase();
  return s === "other";
};

export default function Wellness({ pet }) {
  const petType = usePetStore((state) => state.petType);
  const [apiCategories, setApiCategories] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetchAllCategories()
      .then((list) => {
        if (!cancelled && Array.isArray(list)) {
          const active = list.filter((c) => c.isActive !== false);
          setApiCategories(active.map(mapCategory));
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // Static (jo pehle se photo ke sath the) + backend se jo aaye, "Other" mat dikhao
  const staticList = petType === "cat" ? catWellnessData : dogWellnessData;
  const staticWithSlug = staticList.map((item) => ({
    ...item,
    slug: item.slug || titleToCategory(item.title || item.name),
    _id: item.id ?? item.title,
  }));
  const staticSlugs = new Set(staticWithSlug.map((i) => (i.slug || "").toLowerCase()));
  const fromApi = apiCategories.filter(
    (c) => !isOther(c.title, c.slug) && !staticSlugs.has((c.slug || "").toLowerCase())
  );
  const data = [...staticWithSlug, ...fromApi];

  return (
    <section className="w-full py-5">
      <h2 className="text-2xl font-bold text-center mb-8">
        All Round Wellness
      </h2>

      <div className="max-w-7xl mx-auto px-4">
        {data.length > 0 ? (
          <Swiper
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
              1280: { slidesPerView: 8 },
            }}
          >
            {data.map((item, index) => {
              const title = item.title || item.name;
              const image = item.img || item.image;
              const categorySlug = item.slug || titleToCategory(title);
              return (
                <SwiperSlide key={item._id || item.id || index}>
                  <Link
                    href={`/shop?category=${categorySlug}${petType ? `&petType=${petType}` : ""}`}
                    className="flex flex-col items-center block"
                  >
                    <div className="bg-[#FCEBFF] rounded-xl p-4 flex items-center justify-center cursor-pointer hover:shadow-md transition min-h-[140px]">
                      <AdminImage src={image} alt={title || ""} className="h-[140px] object-contain w-full" />
                    </div>
                    <p className="text-sm font-medium text-center pt-2">
                      {title}
                    </p>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="text-center text-gray-500">No categories available</div>
        )}
      </div>
    </section>
  );
}
