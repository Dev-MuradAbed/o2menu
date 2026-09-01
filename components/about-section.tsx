"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative order-2 md:order-1"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl hover-glow">
              <Image
                src="/menu/about.jpeg"
                alt="داخل مطعم أوتو غزة"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-2xl -z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 w-24 h-24 border-2 border-primary/30 rounded-2xl -z-10"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="order-1 md:order-2"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-primary text-sm font-medium tracking-wider mb-4 block"
            >
              من نحن
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground text-balance"
            >
              قصة <span className="text-primary">O2 Gaza</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4 text-muted-foreground text-lg leading-relaxed"
            >
              <p>
                مرحباً بكم في <span className="text-primary"> O2 Gaza </span>
                حيث نجمع بين الأصالة والحداثة في كل طبق نقدمه. منذ تأسيسنا، التزمنا بتقديم أفضل تجربة طعام لعملائنا الكرام.
              </p>
              <p>
                نستخدم أجود المكونات الطازجة ونحضر أطباقنا بعناية فائقة لنضمن لكم مذاقاً استثنائياً في كل مرة تزوروننا فيها.
              </p>
              <p>
                فريقنا المتميز من الطهاة المحترفين يعمل بشغف لتقديم قائمة متنوعة من الأطباق الشرقية والغربية التي ترضي جميع الأذواق.
              </p>
            </motion.div>

            {/* Stats mini */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex gap-8 mt-8 pt-8 border-t border-border/50"
            >
              {[
                { value: "2", label: "فروع لمطعمنا" },
                { value: "+50", label: "صنف مميز" },
                { value: "+5000", label: "عميل سعيد" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
