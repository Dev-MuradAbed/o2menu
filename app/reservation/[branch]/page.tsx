"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { useParams, useRouter } from "next/navigation";
import {
  ShoppingBag,
  Users,
  Phone,
  User,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Trash2,
  Plus,
  Minus,
  Moon,
  Star
} from "lucide-react";

// Reservation-specific items
const RESERVATION_ITEMS = [
  {
    id: "syrian",
    name: "وجبة سوري",
    price: 60,
    image: "/menu/shawarma/53.jpg",
    category: "السوري"
  },
  {
    id: "calzone",
    name: "كاليزوني دجاج",
    price: 60,
    image: "/menu/italian/35.jpg",
    category: "الكلزوني"
  },
  {
    id: "golden",
    name: "فطيرة الذهبية",
    price: 60,
    image: "/menu/western/43.jpg",
    category: "الذهبية"
  }
];

const RAMADAN_PACKAGE = {
  name: "بكج المقبلات الرمضاني ",
  items: ["تمر", "مياه معدنية", "عصير", "كنافة عربية"],
  image: "/images/our-images/35.jpg",
  // desc: ""
};

export default function ReservationBranchPage() {
  const { branch } = useParams();
  const router = useRouter();
  const branchName = branch === "gaza" ? "غزة" : "الوسطى";

  const [cart, setCart] = useState<{ item: any, quantity: number }[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    people: "1",
    notes: ""
  });

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.item.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const totalPrice = cart.reduce((sum, i) => sum + (i.item.price * i.quantity), 0);
  const totalPackages = cart.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    setFormData(prev => ({ ...prev, people: totalPackages.toString() }));
  }, [totalPackages]);

  const handleWhatsApp = () => {
    if (!formData.name || !formData.phone) {
      alert("يرجى ملء البيانات المطلوبة");
      return;
    }

    const orderDetails = cart.map(i =>
      `* ${i.item.name} x${i.quantity} (+ ${RAMADAN_PACKAGE.name})`
    ).join("\n");

    const message = `*طلب حجز طاولة - O2 ${branchName}*
--------------------------
*الاسم:* ${formData.name}
*رقم الجوال:* ${formData.phone}
*عدد الأشخاص:* ${formData.people}
*اليوم:* الأربعاء (حجز يومي)
*الملاحظات:* ${formData.notes || "لا يوجد"}

*الطلبات:*
${orderDetails}

*الإجمالي:* ${totalPrice} شيكل
--------------------------
رمضان كريم 🌙`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = branch === "gaza" ? "972569000400" : "972597111811"; // Replace with actual numbers if different
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="pt-24 pb-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
              <Moon size={120} className="text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 z-10 relative">
              حجز فرع {branchName}
            </h1>
            <p className="text-gray-400">حجز يوم الأربعاء - البكج الرمضاني متوفر مع كل وجبة</p>
          </div>

          {/* Ramadan Package Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto mb-16 bg-card rounded-3xl overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/10"
          >
            <div className="md:flex">
              <div className="md:w-1/3 h-64 md:h-auto bg-primary/5 relative">
                <img src={RAMADAN_PACKAGE.image} alt="بكج رمضان" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
              </div>
              <div className="md:w-2/3 p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-primary mb-4">{RAMADAN_PACKAGE.name}</h2>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {RAMADAN_PACKAGE.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300">
                      <Star size={14} className="text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                {/* <p className="text-sm text-primary/70 italic font-medium">
                  * {RAMADAN_PACKAGE.desc}
                </p> */}
              </div>
            </div>
          </motion.div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {RESERVATION_ITEMS.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -10 }}
                className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all shadow-xl"
              >
                <div className="h-56 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                    {item.price} شيكل
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">تشمل وجبة {item.category} + البكج الرمضاني الكامل</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    إضافة للحجز
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && !showCheckout && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-2xl flex items-center justify-between px-8 hover:bg-primary/90 transition-colors"
          >
            <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">{totalPackages} بكجات</span>
            <span className="text-lg">فتح السلة وتأكيد الحجز</span>
            <span className="text-lg">{totalPrice} شيكل</span>
          </button>
        </motion.div>
      )}

      {/* Checkout Sidebar/Modal */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckout(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-card rounded-3xl overflow-hidden border border-border/50 shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Checkout Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <ShoppingBag className="text-primary" />
                  سلة الحجز
                </h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="text-gray-400 hover:text-white"
                >
                  إغلاق
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-4">
                  {cart.map((i) => (
                    <div key={i.item.id} className="bg-[#1f1f1f] p-4 rounded-2xl flex items-center gap-4">
                      <img src={i.item.image} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="font-bold">{i.item.name}</h4>
                        <p className="text-xs text-primary mt-1">+ {RAMADAN_PACKAGE.name}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-black/20 rounded-lg px-2 py-1">
                        <button onClick={() => updateQuantity(i.item.id, -1)}><Minus size={16} /></button>
                        <span className="font-bold w-4 text-center">{i.quantity}</span>
                        <button onClick={() => updateQuantity(i.item.id, 1)}><Plus size={16} /></button>
                      </div>
                      <div className="text-left flex   gap-1">
                        <p className="font-bold ">{i.item.price * i.quantity} شيكل</p>
                        <div className="text-left">
                          <button
                            onClick={() => removeFromCart(i.item.id)}
                            className="text-red-500 hover:text-red-400 mt-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-600/10 border border-amber-600/20 p-6 rounded-2xl space-y-4">
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <User size={20} />
                    بيانات الحجز
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 mr-2">الاسم بالكامل</label>
                      <input
                        type="text"
                        placeholder="أدخل اسمك"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 mr-2">رقم الجوال</label>
                      <input
                        type="tel"
                        placeholder="059xxxxxxx"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors text-left"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 mr-2">عدد الأشخاص</label>
                      <input
                        type="number"
                        min="1"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors"
                        value={formData.people}
                        onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 mr-2">موعد الحجز</label>
                      <div className="w-full bg-black/20 border border-white/5 text-gray-500 rounded-xl px-4 py-3 cursor-not-allowed flex items-center gap-2">
                        <Calendar size={16} />
                        <span>يوم الأربعاء القادم</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 mr-2">ملاحظات إضافية</label>
                    <textarea
                      placeholder="أي ملاحظات أو طلبات خاصة"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors h-24 resize-none"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Checkout Footer */}
              <div className="p-6 border-t border-border/50 bg-secondary/10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">الإجمالي الكلي:</span>
                  <span className="text-2xl font-bold text-primary">{totalPrice} شيكل</span>
                </div>
                <button
                  onClick={handleWhatsApp}
                  disabled={cart.length === 0}
                  className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 size={24} />
                  تأكيد الحجز عبر الواتساب
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
