"use client";

import React from "react"

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

interface Category {
    id: string;
    name: string;
    icon: string;
}

export function RotatingCategories({
    categories,
    branch,
}: {
    categories: Category[];
    branch: string;
}) {
    const [isAutoRotating, setIsAutoRotating] = useState(true);
    const [rotation, setRotation] = useState(0);
    const itemCount = categories.length;
    const angleSlice = 360 / itemCount;

    // Auto-rotate every 3 seconds
    React.useEffect(() => {
        if (!isAutoRotating) return;

        const interval = setInterval(() => {
            setRotation((prev) => prev - angleSlice);
        }, 3000);

        return () => clearInterval(interval);
    }, [isAutoRotating, angleSlice]);

    return (
        <div className="relative w-full max-w-4xl mx-auto py-20">
            {/* Center text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
                <div className="text-center">
                    <p className="text-muted-foreground text-sm mb-2">اختر القسم</p>
                    <p className="text-2xl font-bold text-primary">دوّر الحلقة</p>
                </div>
            </motion.div>

            {/* Rotating container */}
            <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 mx-auto"
                onMouseEnter={() => setIsAutoRotating(false)}
                onMouseLeave={() => setIsAutoRotating(true)}
                animate={{ rotate: rotation }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
                {categories.map((category, index) => {
                    const angle = (index * angleSlice * Math.PI) / 180;
                    const radius = 120; // Distance from center
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <motion.div
                            key={category.id}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{
                                x,
                                y,
                            }}
                        >
                            <Link
                                href={`/category/${category.id}?branch=${branch}`}
                                className="block"
                            >
                                <motion.div
                                    animate={{ rotate: -rotation }}
                                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative"
                                >
                                    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/30 hover:border-primary transition-colors duration-300 shadow-lg hover:shadow-xl cursor-pointer group bg-card flex items-center justify-center"
                                    >
                                        {/* Background image or gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-colors duration-300" />

                                        {/* Icon/Label */}
                                        <div className="relative z-10 text-center">
                                            <div className="text-3xl md:text-4xl mb-2">
                                                {category.icon}
                                            </div>
                                            <div className="text-xs md:text-sm font-semibold text-foreground text-balance px-2">
                                                {category.name}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tooltip on hover */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-background border border-border rounded-lg px-3 py-1 text-xs whitespace-nowrap pointer-events-none"
                                    >
                                        اختر هذا القسم
                                    </motion.div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Drag indicator for mobile */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="text-center mt-8 text-xs text-muted-foreground"
            >
                حرّك فوق الحلقة لإيقاف الدوران
            </motion.div>
        </div>
    );
}
