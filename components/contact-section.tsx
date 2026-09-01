"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// 1. تحميل الخريطة بشكل ديناميكي لتجنب أخطاء السيرفر (SSR)
const MapContainerLoader = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayerLoader = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer).then(() => import("react-leaflet").then(m => m.TileLayer)),
  { ssr: false }
);
// ملاحظة: لتبسيط الاستخدام في Next.js، يفضل تعريف المكون بالأسفل بشكل منفصل
const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted animate-pulse flex items-center justify-center">جاري تحميل الخريطة...</div>
});

const branches = [
  {
    name: "فرع غزة",
    address: "شارع النصر، مدينة غزة",
    phone: "+972 56 900 0400",
    phoneHref: "tel:+972569000400",
  },
  {
    name: "فرع الوسطى",
    address: "مفترق أبو صرار، النصيرات",
    phone: "+972 59 711 1811",
    phoneHref: "tel:+972597111811",
  },
];

const workingHours = "يومياً من 10 صباحاً - 12 منتصف الليل";

const socialLinks = [
  {
    name: "واتساب",
    description: "راسلنا مباشرة",
    href: "https://wa.me/972597111811",
    color: "bg-green-500 hover:bg-green-600",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "انستغرام",
    description: "تابعنا للمزيد",
    href: "https://www.instagram.com/o2gaza1",
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "فيسبوك",
    description: "انضم لصفحتنا",
    href: "https://www.facebook.com/share/16xuwnMGau/",
    color: "bg-blue-600 hover:bg-blue-700",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider mb-4 block">تواصل معنا</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">نحن في انتظارك</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">لديك سؤال أو اقتراح؟ تواصل معنا وسنرد عليك في أقرب وقت</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    تواصل معنا عبر
                  </h3>
                  <p className="text-muted-foreground text-sm">اختر الطريقة المناسبة لك</p>
                </div>
              </div>

              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 p-5 rounded-2xl text-white font-medium transition-all ${social.color}`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      {social.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold">{social.name}</h4>
                      <p className="text-white/80 text-sm">{social.description}</p>
                    </div>
                    <svg className="w-6 h-6 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Branches Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Branches Cards */}
            <div className="grid gap-4">
              {branches.map((branch, index) => (
                <motion.div
                  key={branch.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-xl bg-card border border-border/50 
                            hover:border-primary/30 hover:shadow-md
                            transition-all cursor-pointer"
                  onClick={() => window.location.href = branch.phoneHref}
                >
                  <div className="flex items-start gap-4">
                    {/* أيقونة الموقع */}
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-bold text-foreground text-lg mb-2">
                        {branch.name}
                      </h4>

                      <p className="text-muted-foreground mb-3">
                        {branch.address}
                      </p>

                      {/* زر الاتصال */}
                      <a
                        href={
                          /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
                            ? branch.phoneHref
                            : `https://wa.me/${branch.phone.replace(/\D/g, "")}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                                  bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                      >
                        <Phone className="w-4 h-4" />
                        <span dir="ltr">{branch.phone}</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>


            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-5 rounded-xl bg-card border border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">ساعات العمل</h4>
                  <p className="text-muted-foreground">{workingHours}</p>
                </div>
              </div>
            </motion.div>


            {/* استدعاء المكون الديناميكي للخريطة */}
            <div className="h-[250px] rounded-xl overflow-hidden border relative z-0">
              <Map />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}