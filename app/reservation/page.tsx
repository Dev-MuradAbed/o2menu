"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/Footer";
import { MapPin, Utensils, Moon, Star } from "lucide-react";
import { BRANCHES } from "../../lib/branch-context";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function ReservationSelectionPage() {
    const branchList = Object.values(BRANCHES);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <Navbar />
            <div className="relative pt-24 md:pt-32 pb-20 md:pb-32 overflow-hidden">
                {/* Ramadan Background Elements */}
                <div className="absolute top-10 right-10 opacity-20 animate-pulse">
                    <Moon size={100} className="text-primary" />
                </div>
                <div className="absolute bottom-20 left-10 opacity-10">
                    <Star size={60} className="text-primary/50" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary text-sm font-medium tracking-wider mb-4 block">
                            رمضان كريم
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance text-white">
                            حجز طاولة للإفطار
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto text-pretty">
                            اختر الفرع الذي تود الحجز فيه واستمتع بأجمل الأجواء الرمضانية
                        </p>
                    </motion.div>

                    {/* Branch Cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                    >
                        {branchList.map((branch) => (
                            <motion.div key={branch.id} variants={itemVariants}>
                                <Link href={`/reservation/${branch.id}`}>
                                    <motion.div
                                        whileHover={{ y: -12, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative h-full rounded-2xl overflow-hidden bg-[#1a1a1a] border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 p-8 cursor-pointer group shadow-2xl"
                                    >
                                        {/* Background accent line */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 via-primary to-transparent" />

                                        {/* Content */}
                                        <div className="relative z-10">
                                            {/* Header */}
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
                                                    <Utensils className="w-6 h-6 text-primary" />
                                                </div>
                                                <div className="text-right flex-1">
                                                    <h2 className="text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                                                        {branch.name}
                                                    </h2>
                                                    <p className="text-sm text-gray-400">
                                                        {branch.address}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* CTA Button */}
                                            <div className="w-full px-6 py-3 bg-primary text-primary-foreground text-center font-bold rounded-xl hover:bg-primary/90 transition-colors">
                                                احجز الآن
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
