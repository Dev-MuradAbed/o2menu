"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const quickLinks = [
  { href: "/about", label: "من نحن" },
  { href: "/#services", label: "خدماتنا" },
  { href: "/categories", label: "قائمتنا" },
  { href: "#contact", label: "تواصل معنا" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/1AuMX1kHQW/", label: "فيسبوك" },
  { icon: Instagram, href: "https://www.instagram.com/o2gaza1?igsh=MWo2NW1oZ2IydjlqOQ==", label: "إنستغرام" },
  {
    icon: MessageCircle,
    href: "https://wa.me/972597111811",
    label: "واتساب",
  }
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-10"> */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-start">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-bold">
                <span className="text-foreground">Gaza</span>{" "}
                <div className="o2-logo-red text-primary">
                  <span>2</span>0
                </div>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-6">
              تجربة طعام استثنائية تجمع بين الأصالة والحداثة، حيث نقدم لكم أشهى
              المأكولات في أجواء راقية.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-foreground mb-4">
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">فروعنا</h3>
            <div className="space-y-6 flex justify-between md:justify-start lg:justify-normal">
              <motion.div className="lg:col-span-1">
                <h3 className="text-lg font-bold mb-4 text-primary">فرع غزة</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> مدينة غزة، شارع النصر
                  </li>
                  <li className="flex items-center gap-2" dir="rtl">
                    <Phone className="w-4 h-4" />{" "}
                    <span dir="ltr">+972 56 900 0400</span>
                  </li>
                  <li>
                    <a
                      href="mailto:info@o2company.com"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>info@o2company.com</span>
                    </a>
                  </li>

                </ul>
              </motion.div>

              <motion.div className="lg:col-span-1 lg:ms-20 :ml-30 xl:ms-32 transition-all">
                <h3 className="text-lg font-bold mb-4 text-primary">
                  فرع النصيرات
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> النصيرات، مفترق ابو صرار
                  </li>
                  <li className="flex items-center gap-2" dir="rtl">
                    <Phone className="w-4 h-4" />{" "}
                    <span dir="ltr">+972 59 711 1811</span>
                  </li>
                  <li>
                    <a
                      href="mailto:info@o2company.com"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>info@o2company.com</span>
                    </a>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-foreground mb-4">
              ساعات العمل
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex justify-between">
                <span>جميع أيام الاسبوع</span>
                <span>10:00 ص - 10:00 م</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm">
            <p>
              جميع الحقوق محفوظة &copy; {new Date().getFullYear()} مطعم O2 Gaza
            </p>
            <p>تم تطويره بواسطة فريق 02 المميز</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
