"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, ChefHat, Clock, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "عميل سعيد",
  },
  {
    icon: ChefHat,
    value: 15000,
    suffix: "+",
    label: "طبق محضر",
  },
  {
    icon: Clock,
    value: 10,
    suffix: "+",
    label: "سنوات خبرة",
  },
  {
    icon: Star,
    value: 98,
    suffix: "%",
    label: "تقييمات إيجابية",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString("ar-SA")}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider mb-4 block">
            إنجازاتنا
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            أرقام نفخر بها
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            رحلة نجاح مستمرة نبنيها معكم يوماً بعد يوم
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Counter */}
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
