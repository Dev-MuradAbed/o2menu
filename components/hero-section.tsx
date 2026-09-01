import Image from "next/image";
import React from "react";

const HERO_IMAGES = [
  "/images/our-images/1.jpg",
  "/images/our-images/2.jpg",
  "/images/our-images/3.jpg",
  "/images/our-images/33.jpg",
  "/images/our-images/14.jpg",
  "/images/our-images/34.jpg",
  "/images/our-images/35.jpg",
  "/images/our-images/18.jpg",
  "/images/our-images/19.jpg",
  "/images/our-images/43.jpg",
  "/images/our-images/48.jpg",
  "/images/our-images/52.jpg",
  "/images/our-images/53.jpg",
];

const Column = ({
  images,
  animationClass,
  priority = false,
}: {
  images: string[];
  animationClass: string;
  priority?: boolean;
}) => (
  <div className={`flex flex-col gap-6 ${animationClass}`}>
    {[...images, ...images].map((src, i) => (
      <div key={i} className="w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl transform transition-all duration-700 hover:scale-[1.03]">
        <Image
          src={src}
          className="w-full h-full object-cover"
          alt=""
          width={360}
          height={480}
          priority={priority && i === 0}
          sizes="(max-width: 1024px) 50vw, 20vw"
        />
      </div>
    ))}
  </div>
);

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen overflow-hidden bg-black">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 z-0 opacity-50 md:opacity-70 flex gap-4 md:gap-6 px-4 md:px-6 mask-fade-edges transform scale-110">
        {/* Laptop: Col 1 | Mobile: Hidden */}
        <div className="hidden lg:block flex-1">
          <Column images={HERO_IMAGES.slice(0, 3)} animationClass="animate-scroll-up" />
        </div>

        {/* Mobile: Col 1 (Down) | Laptop: Col 2 (Down) */}
        <div className="flex-1">
          <Column images={HERO_IMAGES.slice(3, 6)} animationClass="animate-scroll-down" priority />
        </div>

        {/* Laptop: Col 3 | Mobile: Hidden */}
        <div className="hidden lg:block flex-1 mt-32">
          <Column images={HERO_IMAGES.slice(6, 9)} animationClass="animate-scroll-up-slow" />
        </div>

        {/* Mobile: Col 2 (Up) | Laptop: Col 4 (Up) */}
        <div className="flex-1 mt-16 md:mt-24">
          <Column images={HERO_IMAGES.slice(9, 12)} animationClass="animate-scroll-up" />
        </div>

        {/* Laptop: Col 5 | Mobile: Hidden */}
        <div className="hidden xl:block flex-1">
          <Column images={HERO_IMAGES.slice(0, 3)} animationClass="animate-scroll-down" />
        </div>
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-transparent to-black/85"></div>
      {/* Lightened Blur */}
      <div className="absolute inset-0 z-10 backdrop-blur-[0.5px]"></div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="animate-[pinterestReveal_1s_ease-out]">
          <h1 className="text-6xl md:text-8xl sm:text-4xl font-extrabold text-white mb-8 tracking-tighter drop-shadow-2xl flex items-baseline justify-center gap-4">
            <span className='tracking-normal'>Gaza</span>
            <div className="o2-logo-red"><span>2</span>0</div>
          </h1>
          <p className="text-white text-lg md:text-xl font-medium tracking-widest max-w-xl mx-auto mt-10 drop-shadow-md ">
            نفس من الهدوء ولقمة من السعادة
          </p>
        </div>

        <div className="mt-14 animate-[pinterestReveal_1.2s_ease-out] flex flex-col md:flex-row gap-4 justify-center">
          <a href="/select-branch" className="group relative inline-flex items-center justify-center px-14 py-5 rounded-2xl bg-primary text-white text-xl font-bold transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              اطلب من المنيو
              <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-[-6px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          </a>
          {/* <a href="/reservation" className="group relative inline-flex items-center justify-center px-14 py-5 rounded-2xl bg-amber-600 text-white text-xl font-bold transition-all hover:bg-amber-700 hover:scale-105 active:scale-95 shadow-2xl shadow-amber-600/30 overflow-hidden">
            <span className="relative z-10 flex items-center gap-3">
              حجز طاولة رمضانية 🌙

            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          </a> */}

        </div>
      </div >

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section >
  );
};

export default HeroSection;
