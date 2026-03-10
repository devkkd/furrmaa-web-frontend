"use client";
import React, { useState, useEffect } from 'react';
import Container from '@/components/Container';
import { IoChevronDown } from 'react-icons/io5';
import WhyChooseFurrmaa from '@/components/WhyChooseFurrmaa';
import { fetchFaqs } from '@/lib/api';

const staticFaqs = [
  { q: "What is Furrmaa?", a: "Furrmaa is a mobile app that connects pet owners with a variety of pet-related services - from vet clinics to adoption, events, chat support, pet cremation requests, and more." },
  { q: "Do I need an account to use Furrmaa?", a: "Yes, to manage pet profiles, request services, and use personalized features, you need to create an account." },
  { q: "What kind of services can I find on Furrmaa?", a: "You can access veterinary clinics, adoption and lost & found services, pet events, cremation requests, pet-profile management, and a premium Pet AI Chatbot." },
  { q: "How does location-based search work?", a: "With your permission, Furrmaa uses your current location to show nearby veterinary clinics and services – helping you find help quickly when needed." },
  { q: "Is my personal and pet information safe?", a: "Yes. We follow industry-standard security practices, do not sell your data, and only share it with trusted partners when necessary to deliver services you request." },
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [faqs, setFaqs] = useState(staticFaqs);

  useEffect(() => {
    fetchFaqs()
      .then((list) => setFaqs((list || []).map((f) => ({ q: f.question, a: f.answer }))))
      .catch(() => setFaqs(staticFaqs));
  }, []);

  return (
    <section className="w-full bg-white py-12 md:py-12">
      <Container>
        <div className="max-w-7xl mx-auto px-6 md:px-9">
          
          {/* Centered Top Heading */}
          <div className="mb-16">
            <h1 className="text-4xl font-extrabold text-black tracking-tight">
              Frequently Asked Questions
            </h1>
          </div>

          {/* Full Width Question List */}
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-6 pt-2"
              >
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? -1 : index)
                  }
                  className="w-full flex justify-between items-center text-left group"
                >
                  <h4 className="text-base md:text-lg font-bold text-black group-hover:text-gray-700 transition-colors">
                    {item.q}
                  </h4>

                  <span
                    className={`ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-300 ${
                      activeIndex === index ? "rotate-180 bg-gray-200 text-black" : ""
                    }`}
                  >
                    <IoChevronDown className="text-xl" />
                  </span>
                </button>

                {/* Smooth Expandable Answer */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-800 text-[15px] md:text-base leading-relaxed max-w-5xl">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <WhyChooseFurrmaa/>
    </section>
  );
};

export default FaqPage;