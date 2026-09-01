"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/ui/button";
import {
  UtensilsCrossed,
  Truck,
  PartyPopper,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: 1,
    icon: UtensilsCrossed,
    title: "تناول الطعام في المطعم",
    shortDesc: "استمتع بأجواء راقية ومميزة في صالاتنا الفاخرة",
    fullDesc:
      "نوفر لكم تجربة طعام استثنائية في أجواء راقية ومريحة. صالاتنا مصممة بعناية لتوفير الخصوصية والراحة مع خدمة ضيافة متميزة من فريق عمل محترف. استمتعوا بأطباقنا الشهية في بيئة أنيقة تناسب جميع المناسبات.",
    image: "/images/main.jpeg",
    features: [
      "صالات خاصة للعائلات",
      "أجواء هادئة ومريحة",
      "خدمة ضيافة متميزة",
      "قائمة طعام متنوعة",
    ],
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: 2,
    icon: Truck,
    title: "خدمة التوصيل السريع",
    shortDesc: "نوصل طلبك إلى باب منزلك طازجاً وساخناً",
    fullDesc:
      "خدمة توصيل سريعة وموثوقة تضمن وصول طلبك بأفضل حالة. نستخدم عبوات خاصة للحفاظ على حرارة الطعام وجودته. فريق التوصيل لدينا مدرب على التعامل الاحترافي وضمان رضا العملاء.",
    image: "/images/gallery-4.jpg",
    features: [
      "توصيل خلال 30-45 دقيقة",
      "تتبع الطلب مباشرة",
      "عبوات حافظة للحرارة",
      "تغطية واسعة للمناطق",
    ],
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 3,
    icon: PartyPopper,
    title: "المناسبات والحفلات",
    shortDesc: "نقدم خدمات تموين متكاملة لحفلاتكم ومناسباتكم",
    fullDesc:
      "نوفر خدمات تموين شاملة لجميع أنواع المناسبات والحفلات. من الأعراس والعزائم إلى الاجتماعات والمؤتمرات. فريقنا المتخصص يضمن تقديم أفضل الأطباق مع خدمة احترافية تليق بمناسباتكم الخاصة.",
    image: "/images/gallery-5.jpg",
    features: [
      "قوائم طعام مخصصة",
      "خدمة ضيافة كاملة",
      "تجهيز وتنسيق الحفلات",
      "أسعار تنافسية للجملة",
    ],
    color: "from-rose-500/20 to-pink-500/20",
  },
];

export default function ServicesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % services.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentService = services[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-primary text-sm font-medium tracking-wider mb-4 block">
              ماذا نقدم
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
              خدماتنا المتميزة
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              نسعى دائماً لتقديم أفضل الخدمات لعملائنا الكرام بجودة عالية واحترافية
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Slider Section */}
      <section
        className="py-8 md:py-16"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* Slider Container */}
            <div className="relative overflow-hidden rounded-3xl bg-card border border-border/50 min-h-[600px] md:min-h-[600px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${currentService.color} opacity-50`}
                  />

                  <div className="relative h-full grid md:grid-cols-2 gap-6 p-6 md:p-10">
                    {/* Content Side */}
                    <div className="flex flex-col justify-center order-2 md:order-1">
                      {/* Icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
                      >
                        <currentService.icon className="w-8 h-8 text-primary" />
                      </motion.div>

                      {/* Title */}
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-4xl font-bold text-foreground mb-4"
                      >
                        {currentService.title}
                      </motion.h2>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-muted-foreground text-lg leading-relaxed mb-6"
                      >
                        {currentService.fullDesc}
                      </motion.p>

                      {/* Features */}
                      <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-3 mb-8"
                      >
                        {currentService.features.map((feature, idx) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="flex items-center gap-3 text-foreground"
                          >
                            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </motion.ul>

                      {/* CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <Button
                          asChild
                          size="lg"
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <Link href="/menu">اطلب الآن</Link>
                        </Button>
                      </motion.div>
                    </div>

                    {/* Image Side */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative order-1 md:order-2 h-64 md:h-full"
                    >
                      <div className="relative h-full rounded-2xl overflow-hidden">
                        <Image
                          src={currentService.image || "/placeholder.svg"}
                          alt={currentService.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {/* <button
                type="button"
                onClick={prevSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-background hover:border-primary/50 transition-all"
                aria-label="الشريحة السابقة"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground hover:bg-background hover:border-primary/50 transition-all"
                aria-label="الشريحة التالية"
              >
                <ChevronLeft className="w-6 h-6" />
              </button> */}
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-3 mt-6">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`relative h-3 rounded-full transition-all duration-300 ${index === currentIndex
                    ? "w-10 bg-primary"
                    : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  aria-label={`انتقل إلى ${service.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              نظرة سريعة على خدماتنا
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              اختر الخدمة المناسبة لك واستمتع بتجربة طعام لا تُنسى
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => goToSlide(index)}
                className={`group cursor-pointer relative p-6 rounded-2xl border transition-all duration-300 ${index === currentIndex
                  ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/10"
                  : "bg-card border-border/50 hover:border-primary/30 hover:shadow-lg"
                  }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${index === currentIndex
                    ? "bg-primary/20"
                    : "bg-primary/10 group-hover:bg-primary/20"
                    }`}
                >
                  <service.icon
                    className={`w-7 h-7 ${index === currentIndex
                      ? "text-primary"
                      : "text-primary/70 group-hover:text-primary"
                      }`}
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.shortDesc}</p>

                {index === currentIndex && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              جاهز لتجربة خدماتنا؟
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              تواصل معنا الآن واحصل على أفضل تجربة طعام مع خدمات متميزة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/menu">تصفح القائمة</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent"
              >
                <Link href="/#contact">تواصل معنا</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
