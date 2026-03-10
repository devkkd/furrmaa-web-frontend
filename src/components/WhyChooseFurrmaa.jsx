"use client"
import { questions } from "@/data/faqs";
import { useState } from "react";
import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { IoChevronDown } from 'react-icons/io5';

const features = [
  {
    id: 1,
    image: "/images/whyFurrmaa/why1.png",
    title: "Designed Specifically For\nDogs & Cats",
  },
  {
    id: 2,
    image: "/images/whyFurrmaa/whe2.png",
    title: "Trusted Service Partners",
  },
  {
    id: 3,
    image: "/images/whyFurrmaa/why3.png",
    title: "AI-Driven Smart\nCare",
  },
  {
    id: 4,
    image: "/images/whyFurrmaa/why4.png",
    title: "Secure, Scalable\nPlatform",
  },
  {
    id: 5,
    image: "/images/whyFurrmaa/why5.png",
    title: "Community\nFirst Approach",
  },
];

export default function WhyChooseFurrmaa() {
  return (
    <>
      <section className="w-full bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-14">
            Why Pet Parents Choose Furrmaa
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
            {features.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 mb-4 object-contain"
                />
                <p className="text-sm font-medium text-gray-700 whitespace-pre-line">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <p className="text-gray-700 font-semibold max-w-4xl mx-auto">
            Furrmaa Is Built To Simplify Pet Parenting Without Compromising Care,
            Safety, Or Love.
          </p>
        </div>
      </section>

      <DownloadApk />
      <FaqSection />
    </>
  );
}

function DownloadApk() {
  return (
    <section
      className="w-full py-20 px-6"
      style={{
        background: "linear-gradient(180deg, #F3F8FF 0%, #C0DBFF 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-14">

          {/* Left */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-4">
              Download the Furrmaa App
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Care for Your <br />
              Pet Anytime, Anywhere
            </h2>

            <p className="text-gray-700 max-w-xl mb-8 leading-relaxed">
              Everything Furrmaa offers is available right in your pocket.
              Manage your pet’s needs, track health, shop essentials,
              book services, and stay connected with the pet community
              wherever you are.
            </p>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:opacity-90">
                <FaApple className="text-xl" />
                <span className="text-sm font-medium">App Store</span>
              </button>

              <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:opacity-90">
                <FaGooglePlay className="text-xl" />
                <span className="text-sm font-medium">Google Play</span>
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center lg:justify-end gap-6">
            <img
              src="/images/twophones.png"
              alt="App Home"
              className="w-[340px] md:w-[460px] drop-shadow-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}


function FaqSection() {
  const faqs = questions;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* Left */}
        <div>
          <h2 className="text-4xl leading-13 md:text-4xl font-bold text-gray-900">
            Frequently Asked
            <br />
            Questions
          </h2>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-6"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? -1 : index)
                }
                className="w-full flex justify-between items-center text-left"
              >
                <h4 className="text-base font-semibold text-gray-900">
                  {item.q}
                </h4>

                <span
                  className={`ml-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-black transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                    }`}
                >
                  <IoChevronDown />
                </span>
              </button>

              {/* Smooth Expandable Transition */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}

          {/* CTA */}
          <button className="mt-10 bg-slate-900 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-slate-800 transition">
            See All FAQ’s →
          </button>
        </div>

      </div>
    </section>
  );
}
