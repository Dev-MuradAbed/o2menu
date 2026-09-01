"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/Footer";
import { MapPin, Phone, Clock, Utensils } from "lucide-react";

const branches = [
    {
        id: "gaza",
        name: "O2 - غزة",
        region: "مدينة غزة",
        phone: "+970569000400",
        hours: "10:00 - 23:00",
        address: "شارع الشهداء، مدينة غزة",
        description: "الفرع الرئيسي في قلب مدينة غزة",
    },
    {
        id: "middle",
        name: "O2 - الوسطى",
        region: "النصيرات",
        phone: "+970597111811",
        hours: "10:00 - 23:00",
        address: "الشارع الرئيسي، النصيرات",
        description: "فرع منطقة الوسطى في النصيرات",
    },
];

export default function BranchesPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section with Image */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden"
            >
                <Image
                    src="/images/branches-hero.jpg"
                    alt="فروع O2"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance mb-4"
                    >
                        اختر الفرع الأقرب إليك
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-base md:text-lg text-white/90 max-w-2xl text-pretty"
                    >
                        نحن نخدمك في عدة مناطق في قطاع غزة باستمرار
                    </motion.p>
                </div>
            </motion.div>

            <div className="pt-20 md:pt-28 pb-20 md:pb-32">
                <div className="container mx-auto px-4">
                    {/* Branch Cards Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16"
                    >
                        {branches.map((branch, index) => (
                            <motion.div
                                key={branch.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative rounded-2xl overflow-hidden bg-card border-2 border-border hover:border-primary/50 transition-colors duration-300 p-6 md:p-8 h-full"
                                >
                                    {/* Background accent */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Header with icon */}
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                                                <Utensils className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className="text-right flex-1">
                                                <h2 className="text-2xl font-bold text-foreground">
                                                    {branch.name}
                                                </h2>
                                                <p className="text-sm text-muted-foreground">
                                                    {branch.region}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                                            {branch.description}
                                        </p>

                                        {/* Info items */}
                                        <div className="space-y-3 mb-8">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-foreground">
                                                    {branch.address}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                                                <a
                                                    href={`tel:${branch.phone}`}
                                                    className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
                                                >
                                                    {branch.phone}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                                                <span className="text-sm text-foreground">
                                                    {branch.hours}
                                                </span>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Link
                                                href="/select-branch"
                                                className="block w-full px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors text-center"
                                            >
                                                اختر من القائمة
                                            </Link>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Quick Info Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
                    >
                        <div className="bg-card rounded-xl p-6 border border-border/50">
                            <div className="text-3xl font-bold text-primary mb-2">2</div>
                            <p className="text-muted-foreground text-sm md:text-base">
                                فرع متاح الآن
                            </p>
                        </div>
                        <div className="bg-card rounded-xl p-6 border border-border/50">
                            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                            <p className="text-muted-foreground text-sm md:text-base">
                                خدمة توصيل سريعة
                            </p>
                        </div>
                        <div className="bg-card rounded-xl p-6 border border-border/50">
                            <div className="text-3xl font-bold text-primary mb-2">100%</div>
                            <p className="text-muted-foreground text-sm md:text-base">
                                جودة مضمونة
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
