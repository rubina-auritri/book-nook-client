"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { ArrowRight, BookOpen } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    tag: "DISCOVER YOUR NEXT FAVORITE",
    title: "A World of Stories Awaits You.",
    description:
      "Explore thousands of inspiring books, timeless classics, and exciting new releases. Your next great read starts here.",
    image: "/images/books/hero-books-1.png",
    theme: "from-[#172554] via-[#1e3a5f] to-[#334155]",
  },
  {
    tag: "READ. LEARN. GROW.",
    title: "Turn Every Page Into an Adventure.",
    description:
      "From personal growth to unforgettable fiction, discover books that inspire your imagination and expand your world.",
    image: "/images/books/hero-books-2.png",
    theme: "from-[#422006] via-[#78350f] to-[#92400e]",
  },
  {
    tag: "YOUR NEXT CHAPTER STARTS HERE",
    title: "Find Books That Speak to You.",
    description:
      "Discover handpicked collections, explore popular titles, and find your next favorite book at BookNook.",
    image: "/images/books/hero-books-3.png",
    theme: "from-[#312e81] via-[#4338ca] to-[#6366f1]",
  },
];

export default function HeroSlider() {
  return (
    <section className="container mx-auto px-4 pt-6">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        className="hero-swiper overflow-hidden rounded-3xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`relative min-h-[460px] overflow-hidden rounded-3xl bg-gradient-to-r ${slide.theme} px-8 py-12 text-white md:min-h-[520px] md:px-16 lg:px-20`}
            >
              <div className="relative z-10 grid min-h-[380px] items-center gap-10 md:grid-cols-2">
                {/* Content */}
                <div className="max-w-xl">
                  <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white/90 backdrop-blur">
                    <BookOpen size={15} />
                    {slide.tag}
                  </span>

                  <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 max-w-lg text-sm leading-7 text-white/75 md:text-base">
                    {slide.description}
                  </p>

                  <Link
                    href="/AllBooks"
                    className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-3.5 font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100"
                  >
                    Browse Books
                    <ArrowRight size={18} />
                  </Link>
                </div>

                {/* Book Image */}
                <div className="relative hidden h-[360px] items-center justify-center md:flex">
                  <div className="absolute h-64 w-64 rounded-full bg-white/10 blur-3xl" />

                  <img
                    src={slide.image}
                    alt="Featured book collection"
                    className="relative z-10 max-h-[350px] w-full object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -bottom-40 -right-10 h-96 w-96 rounded-full border border-white/10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    
    </section>
  );
}