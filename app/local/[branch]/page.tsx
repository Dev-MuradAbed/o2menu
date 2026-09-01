"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BRANCHES } from "../../../lib/branch-context";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Globe,
  UtensilsCrossed,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react";
import { motion, Variants } from "framer-motion";

interface PageProps {
  params: Promise<{
    branch: string;
  }>;
}

export default function BranchLinkTreePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const branch = resolvedParams.branch;
  const branchInfo = BRANCHES[branch];

  if (!branchInfo) {
    notFound();
  }

  const socialLinks = [
    {
      name: "منيو الفرع",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      href: `/local/${branch}/categories`,
      primary: true,
      description: "تصفح قائمة المأكولات والمشروبات"
    },
    {
      name: "واتساب",
      icon: <MessageCircle className="w-5 h-5" />,
      href: `https://wa.me/${branchInfo.phone}`,
      color: "hover:text-[#25D366]",
      description: "راسلنا مباشرة للطلب أو الاستفسار"
    },
    {
      name: "إنستغرام",
      icon: <Instagram className="w-5 h-5" />,
      href: "https://www.instagram.com/o2gaza1",
      color: "hover:text-[#ee2a7b]",
      description: "تابعنا لمشاهدة أحدث العروض والمنتجات"
    },
    {
      name: "فيسبوك",
      icon: <Facebook className="w-5 h-5" />,
      href: "https://www.facebook.com/share/16xuwnMGau/",
      color: "hover:text-[#1877F2]",
      description: "انضم لمجتمعنا على فيسبوك"
    },
    {
      name: "موقعنا الإلكتروني",
      icon: <Globe className="w-5 h-5" />,
      href: "/",
      color: "hover:text-primary",
      description: "العودة للصفحة الرئيسية"
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/10 to-transparent -z-10"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"
      />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-12 text-center"
      >
        <div className="relative w-28 h-28 mb-6 group">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors" />
          <div className="relative w-full h-full rounded-full border-2 border-primary p-1 bg-background shadow-2xl flex items-center justify-center overflow-hidden">
            <Image
              src="/O2.png"
              alt="O2 Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </div>
        </div>
        <h1 className="text-3xl font-black text-foreground mb-3 tracking-tight">
          {branchInfo.name}
        </h1>
        <div className="h-1 w-12 bg-primary rounded-full mb-4 mx-auto" />
        <p className="text-muted-foreground max-w-[280px] mx-auto text-sm leading-relaxed">
          تجربة طعام استثنائية تجمع بين الأصالة والحداثة، نرحب بكم في فرعنا
        </p>
      </motion.div>

      {/* Links Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md space-y-4 z-10"
      >
        {socialLinks.map((link) => (
          <motion.div key={link.name} variants={itemVariants}>
            <Link
              href={link.href}
              className={`
                group relative flex items-center gap-4 p-4 rounded-2xl border border-border/50 
                transition-all duration-300 hover:shadow-xl hover:shadow-primary/5
                ${link.primary
                  ? "bg-primary text-primary-foreground border-none shadow-lg shadow-primary/20"
                  : "bg-card/80 backdrop-blur-md hover:border-primary/30 hover:bg-card"}
              `}
            >
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300
                ${link.primary
                  ? "bg-white/20 group-hover:scale-110"
                  : `bg-secondary text-foreground group-hover:bg-primary/10 group-hover:text-primary ${link.color}`}
              `}>
                {link.icon}
              </div>

              <div className="flex-1 text-right">
                <h3 className="font-bold text-lg leading-tight">{link.name}</h3>
                <p className={`text-xs mt-0.5 ${link.primary ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {link.description}
                </p>
              </div>

              <div className={`
                flex-shrink-0 opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-[-4px]
                ${link.primary ? "text-primary-foreground" : "text-primary"}
              `}>
                <ArrowRight className="w-5 h-5 rotate-180" />
              </div>

              {link.primary && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              )}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Branch Info Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full max-w-md mt-12 p-6 rounded-[2rem] bg-secondary/30 border border-border/40 backdrop-blur-sm relative"
      >
        <div className="absolute -top-3 right-8 px-4 py-1 bg-background border border-border/50 rounded-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          تفاصيل الفرع
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">العنوان</p>
              <p className="text-sm font-medium">{branchInfo.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">رقم الهاتف</p>
              <p className="text-sm font-medium" dir="ltr">+{branchInfo.phone}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-auto pt-16 text-center"
      >
        <p className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase opacity-60">
          &copy; {new Date().getFullYear()} O2 Gaza • المميزون دائماً
        </p>
      </motion.div>
    </div>
  );
}
