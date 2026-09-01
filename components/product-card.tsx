"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MenuItem {
  name: string;
  price?: number;
  pricePerKg?: number;
  variants?: { name: string; price: number }[];
  desc?: string;
  image: string;
  delivery?: boolean;
  active?: boolean;
}

interface ProductCardProps {
  item: MenuItem;
  index: number;
  onClick: () => void;
  byWeight?: boolean;
}

export function ProductCard({
  item,
  index,
  onClick,
  byWeight,
}: ProductCardProps) {
  const getDisplayPrice = () => {
    if (item.pricePerKg) return `${item.pricePerKg} ₪/كغ`;
    if (item.variants && item.variants.length > 0) {
      const minPrice = Math.min(...item.variants.map((v) => v.price));
      return `تبدأ من ${minPrice} ₪`;
    }
    return `${item.price} ₪`;
  };

  const displayPrice = getDisplayPrice();

  const isUnavailable = item.delivery === false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onClick={onClick}
      className={`group relative bg-card rounded-lg ${
        item.active ? "" : "hidden"
      } overflow-hidden aspect-[3/4] cursor-pointer transition-all duration-500 ${
        isUnavailable
          ? "opacity-60"
          : "hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 active:scale-[0.98]"
      }`}
    >
      {/* Image Container */}
      <div className="relative w-full h-2/3 overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className={`object-cover transition-transform duration-700 ease-out ${
            !isUnavailable && "group-hover:scale-110"
          }`}
          sizes="(max-width: 500px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
        {!isUnavailable && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
      </div>

      {/* Info Section */}
      <div className="p-3 md:p-4 h-1/3 flex flex-col justify-between bg-card">
        <h3 className="text-sm md:text-base font-semibold text-foreground leading-tight line-clamp-2">
          {item.name}
        </h3>

        <div className="flex items-center justify-between pt-2">
          <span className="text-primary font-bold text-sm md:text-base">
            {displayPrice}
          </span>
          {isUnavailable && (
            <span className="text-xs text-muted-foreground font-medium">
              غير متاح
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
