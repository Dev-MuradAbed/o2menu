"use client";

import { useMemo } from "react";
import { imgSrc } from "../../../../lib/img";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useLiveMenu } from "../../../../lib/live-menu";

const CATEGORY_DISPLAY = [
  { id: "shawarma", name: "الشاورما", image: "/menu/shawarma/53.jpg" },
  { id: "italian", name: "الإيطالي", image: "/menu/italian/35.jpg" },
  { id: "sandwiches", name: "الوجبات الغربية", image: "/menu/western/43.jpg" },
  { id: "easternSweets", name: "الحلويات الشرقية", image: "/menu/sweets/23.jpg" },
  { id: "westernSweets", name: "الكيك والحلويات", image: "/menu/Cake/38.jpg" },
  { id: "barSweets", name: "حلويات البار", image: "/menu/bar/14.jpg" },
  { id: "drinks", name: "المشروبات", image: "/menu/drinks/1.jpg" },
  { id: "salads", name: "السلطات والمقبلات", image: "/menu/salad/89.jpeg" },
  { id: "gelato", name: "الجيلاتو", image: "/menu/Gelato/72.jpeg" },
];

export default function LocalCategoriesPage({ forcedBranch }: { forcedBranch?: string }) {
  const params = useParams();
  const branch = forcedBranch || (params.branch as string) || "gaza";
  const { menu: branchMenu } = useLiveMenu(branch);

  const categories = useMemo(
    () => CATEGORY_DISPLAY.filter((c) => branchMenu[c.id as keyof typeof branchMenu]),
    [branchMenu]
  );

  if (!categories.length) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-[#dc2626]/30">
      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-[#dc2626] rounded-full blur-[100px] md:blur-[150px] opacity-[0.08]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 md:w-96 md:h-96 bg-[#dc2626] rounded-full blur-[100px] md:blur-[150px] opacity-[0.08]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-16 px-4 md:px-6 overflow-hidden z-10">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 mb-4 md:mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dc2626]"></span>
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-zinc-400">
              قائمة {branch === "middle" ? "فرع الوسطى" : "فرع غزة"} - للعرض فقط
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 tracking-tight leading-tight"
          >
            استكشف <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#dc2626] to-[#ef4444]">الأقسام</span>
          </motion.h1>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-24 md:pb-32 relative z-10">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {categories.map((cat, index) => (
            <motion.div key={cat.id}>
              <Link
                href={`/local/${branch}/category/${cat.id}`}
                className="group block relative"
              >
                <div className="relative h-[350px] md:h-[400px] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-zinc-800/50 bg-zinc-900 transition-all duration-500 group-hover:border-[#dc2626]/30 group-hover:shadow-[0_0_40px_-10px_rgba(220,38,38,0.2)]">
                  <Image
                    src={imgSrc(cat.image)}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-90"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-center text-center">
                    <h2 className="text-2xl md:text-3xl font-black mb-2 group-hover:text-[#dc2626] transition-colors">
                      {cat.name}
                    </h2>
                    <div className="w-12 h-1 bg-[#dc2626] rounded-full mb-4 md:mb-6 transform origin-center transition-all duration-500 group-hover:w-20 md:group-hover:w-24" />
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        عرض الأصناف
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-[#dc2626]" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <style jsx global>{`
        body {
          background-color: #050505;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #050505;
        }
        ::-webkit-scrollbar-thumb {
          background: #1a1a1a;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #dc2626;
        }
      `}</style>
    </main>
  );
}
