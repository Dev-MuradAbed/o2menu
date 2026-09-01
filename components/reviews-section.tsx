"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "أحمد محمد",
    role: "عميل مميز",
    rating: 5,
    text: "من أفضل المطاعم التي زرتها! الطعام لذيذ جداً والخدمة ممتازة. أنصح الجميع بتجربة البرجر المميز.",
    avatar: "أ",
  },
  {
    id: 2,
    name: "سارة أحمد",
    role: "عميلة دائمة",
    rating: 5,
    text: "أجواء رائعة وطعام شهي. الشاورما هنا لا تُضاهى! سأعود بالتأكيد مرة أخرى.",
    avatar: "س",
  },
  {
    id: 3,
    name: "محمود علي",
    role: "زائر",
    rating: 4,
    text: "تجربة مميزة مع العائلة. الأطفال أحبوا البيتزا والحلويات. الأسعار معقولة والجودة عالية.",
    avatar: "م",
  },
  {
    id: 4,
    name: "فاطمة حسن",
    role: "عميلة توصيل",
    rating: 5,
    text: "خدمة التوصيل سريعة والطعام وصل ساخناً وطازجاً. أفضل مطعم للطلبات الخارجية.",
    avatar: "ف",
  },
  {
    id: 5,
    name: "يوسف خالد",
    role: "عميل مميز",
    rating: 5,
    text: "الايطالي هنا رهيييب! اللحم فخم ومتبل بشكل مثالي. تجربة لا تُنسى.",
    avatar: "ي",
  },
];

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const visibleReviews = [
    reviews[(currentIndex - 1 + reviews.length) % reviews.length],
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
  ];

  return (
    <section id="reviews" className="py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider mb-4 block">
            آراء العملاء
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            ماذا يقول عملاؤنا
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            نفخر بثقة عملائنا ونسعى دائماً لتقديم أفضل تجربة
          </p>
        </motion.div>

        {/* Reviews Carousel */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Reviews */}
          <div className="overflow-hidden px-4">
            <div className="flex gap-6 justify-center items-stretch">
              <AnimatePresence mode="popLayout">
                {visibleReviews.map((review, index) => (
                  <motion.div
                    key={`${review.id}-${currentIndex}-${index}`}
                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                    animate={{
                      opacity: index === 1 ? 1 : 0.4,
                      scale: index === 1 ? 1 : 0.85,
                      x: 0,
                    }}
                    exit={{ opacity: 0, x: -100, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={`flex-shrink-0 w-full md:w-[380px] ${
                      index !== 1 ? "hidden md:block" : ""
                    }`}
                  >
                    <div
                      className={`relative p-8 rounded-3xl h-full transition-all duration-300 ${
                        index === 1
                          ? "bg-gradient-to-br from-primary/10 via-card to-card border-2 border-primary/30 shadow-2xl shadow-primary/10"
                          : "bg-card border border-border/30"
                      }`}
                    >
                      {/* Quote icon */}
                      <Quote
                        className={`absolute top-6 left-6 w-10 h-10 ${
                          index === 1 ? "text-primary/30" : "text-primary/10"
                        }`}
                      />

                      {/* Avatar and Info */}
                      <div className="flex items-center gap-4 mb-6">
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${
                            index === 1
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/20 text-primary"
                          }`}
                        >
                          {review.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-lg">
                            {review.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {review.role}
                          </p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review text */}
                      <p
                        className={`leading-relaxed text-lg ${
                          index === 1
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        "{review.text}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-10">
            {reviews.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/20 w-2.5 hover:bg-muted-foreground/40"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
