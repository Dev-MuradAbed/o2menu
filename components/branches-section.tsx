"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Phone, Clock, Utensils } from "lucide-react";
import { useBranch, BRANCHES } from "../lib/branch-context";

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

export default function Branches() {
    const { setSelectedBranch } = useBranch();
    const branchList = Object.values(BRANCHES);

    return (
        <main className="min-h-screen bg-background">
            <div className="pt-24 md:pt-32 pb-20 md:pb-32">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-primary text-sm font-medium tracking-wider mb-4 block">
                            ابدأ من هنا
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
                            اختر الفرع المفضل
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                            اختر من أحد فروعنا واستمتع بأفضل الأطباق المتنوعة
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
                                <Link href={`/categories?branch=${branch.id}`}>
                                    <motion.div
                                        whileHover={{ y: -12, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedBranch(branch.id)}
                                        className="relative h-full rounded-2xl overflow-hidden bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 p-8 cursor-pointer group"
                                    >
                                        {/* Background accent line */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary to-transparent" />

                                        {/* Glow effect */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 0.1 }}
                                            className="absolute inset-0 bg-primary rounded-2xl"
                                        />

                                        {/* Content */}
                                        <div className="relative z-10">
                                            {/* Header */}
                                            <div className="flex items-start gap-4 mb-6">
                                                <motion.div
                                                    whileHover={{ rotate: 12 }}
                                                    className="p-3 bg-primary/10 rounded-xl flex-shrink-0"
                                                >
                                                    <Utensils className="w-6 h-6 text-primary" />
                                                </motion.div>
                                                <div className="text-right flex-1">
                                                    <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                                        {branch.name}
                                                    </h2>
                                                    <p className="text-sm text-muted-foreground">
                                                        {branch.address}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Info items */}
                                            <div className="space-y-3 mb-8">


                                                <motion.div
                                                    whileHover={{ x: -4 }}
                                                    className="flex items-center gap-3"
                                                >
                                                    <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                                                    <span className="text-sm text-foreground">
                                                        10:00 صباحا – 10:00 ليلاً                                                    </span>
                                                </motion.div>
                                            </div>

                                            {/* CTA Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors"
                                            >
                                                ابدأ الطلب من هنا
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                    >
                        {[
                            {
                                title: "أقسام متنوعة",
                                desc: "اختر من قائمة كاملة من الأطباق",
                            },
                            {
                                title: "أسعار خاصة",
                                desc: "عروض مميزة لكل فرع",
                            },
                            {
                                title: "توصيل سريع",
                                desc: "وصول الطلب إلى باب منزلك",
                            },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -4 }}
                                className="text-center p-4 rounded-lg bg-card border border-border/50"
                            >
                                <h3 className="font-semibold text-foreground mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
