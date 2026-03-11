import React from "react";
import { FaPlay } from "react-icons/fa";

const feedItems = [
  {
    id: 1,
    image: "/images/Feed/feed1.png",
  },
  {
    id: 2,
    image: "/images/Feed/feed2.png",
  },
  {
    id: 3,
    image: "/images/Feed/feed3.png",
  },
  {
    id: 4,
    image: "/images/Feed/feed4.png",
  },
];

export default function TrendingPetFeed() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <p className="text-sm font-semibold text-gray-900 mb-3">
          Trending Pet Feed
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          Watch What’s Making Pets Famous Today
          <span>🐾</span>
        </h2>

        <p className="text-gray-900 max-w-3xl mb-14">
          Explore the most loved pet videos and moments shared by the Furrmaa
          community. From playful pups to curious cats, discover what’s trending
          right now—and get inspired to share your own pet’s story.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {feedItems.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-3xl overflow-hidden shadow-sm"
            >
              <img
                src={item.image}
                alt="Trending Pet"
                className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                  <FaPlay />
                </div>
              </div>

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                <button className="bg-slate-900 text-white text-sm px-5 py-2 rounded-full flex items-center gap-1 hover:bg-slate-800 transition">
                  See Feed →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
