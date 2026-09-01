"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const categories = [
  { id: "shawarma", name: "الشاورما", icon: "🌯", color: "from-orange-500/20 to-red-500/20" },
  { id: "italian", name: "الإيطالي", icon: "🍕", color: "from-yellow-500/20 to-orange-500/20" },
  { id: "sandwiches", name: "السندويشات الغربية", icon: "🍔", color: "from-amber-500/20 to-yellow-500/20" },
  { id: "easternSweets", name: "الحلويات الشرقية", icon: "🍯", color: "from-pink-500/20 to-red-500/20" },
  { id: "westernSweets", name: "الكيك والحلويات الغربية", icon: "🍰", color: "from-purple-500/20 to-pink-500/20" },
  { id: "barSweets", name: "حلويات البار", icon: "🍩", color: "from-rose-500/20 to-purple-500/20" },
  { id: "drinks", name: "المشروبات", icon: "🥤", color: "from-blue-500/20 to-cyan-500/20" },
  { id: "salads", name: "السلطات", icon: "🥗", color: "from-green-500/20 to-emerald-500/20" },
];

export function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  return (
    <section id="menu" className="py-20 md:py-32 bg-secondary/30">
      {/* <div className="pt-24 md:pt-32 pb-20 md:pb-32"> */}
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider mb-4 block">
            أقسام القائمة
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            اختر القسم المفضل لديك
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            اختر من بين أقسامنا المتعددة واستمتع بألذ المأكولات والمشروبات
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link
                href={`/category/${category.id}`}
                onMouseEnter={() => setSelectedCategory(category.id)}
                onMouseLeave={() => setSelectedCategory(null)}
                className="group block h-full"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className={`relative h-48 md:h-56 rounded-2xl overflow-hidden bg-gradient-to-br ${category.color} border-2 border-border/50 hover:border-primary/50 transition-all duration-300 flex flex-col items-center justify-center p-6 cursor-pointer group`}
                >
                  {/* Background animated elements */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-primary transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <motion.div
                      animate={selectedCategory === category.id ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-5xl md:text-6xl mb-4"
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      انقر لعرض المنتجات
                    </p>
                  </div>

                  {/* Hover border effect */}
                  <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-2xl transition-colors duration-300" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8"
          >
            <Link
              href="https://dainty-dragon-98cefd.netlify.app/"
              target="_blank"
              className="flex items-center gap-2"
            >
              عرض القائمة الكاملة
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
      {/* </div> */}
    </section>
  );
}
