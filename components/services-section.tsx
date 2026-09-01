"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, ShoppingBag, Truck, PartyPopper } from "lucide-react";

const services = [
  {
    icon: UtensilsCrossed,
    title: "تناول الطعام في المطعم",
    description: "استمتع بأجواء راقية ومميزة في صالاتنا الفاخرة مع خدمة ضيافة استثنائية",
  },
  {
    icon: ShoppingBag,
    title: "طلبات فوري",
    description: "احصل على طلبك جاهزاً للاستلام من المطعم مباشرة بكل سرعة وسهولة",
  },
  {
    icon: Truck,
    title: "خدمة التوصيل",
    description: "نوصل طلبك إلى باب منزلك طازجاً وساخناً في أسرع وقت ممكن",
  },
  {
    icon: PartyPopper,
    title: "المناسبات والحفلات",
    description: "نقدم خدمات تموين متكاملة لحفلاتكم ومناسباتكم الخاصة بأعلى جودة",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 overflow-hidden">
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
            خدماتنا
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            نقدم لكم الأفضل دائماً
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            مهما كانت احتياجاتكم، نحن هنا لنقدم لكم خدمة متميزة تلبي توقعاتكم
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group"
            >
              <div className="relative h-full p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 hover-glow">
                {/* Glass effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                    <service.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
