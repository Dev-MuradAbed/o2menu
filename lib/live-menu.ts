"use client";

/**
 * التوفّر الحيّ — يربط المنيو الإلكتروني بلوحة تحكم البوت.
 *
 * المنيو الثابت في menu-data.ts يبقى مصدر الأسماء والأوصاف والصور.
 * هذه الطبقة تجلب حالة التوفّر (active) والأسعار من البوت وتدمجها،
 * فما يُغلقه الكاشير يختفي من الموقع خلال ثوانٍ.
 *
 * إن تعذّر الوصول للبوت لأي سبب يعمل الموقع بالمنيو الثابت كما كان —
 * لا شاشة بيضاء ولا منيو فارغ.
 */

import { useEffect, useState, useMemo, useCallback } from "react";
import { getMenuByBranch, type MenuData, type MenuItem } from "./menu-data";

/**
 * مصدر البيانات — طريقتان:
 *
 *  أ) وسيط على نفس النطاق (موصى به): اضبط BOT_ORIGIN فقط،
 *     فيمرّ الطلب عبر /bot-api/… بلا CORS ودون كشف رابط Render.
 *
 *  ب) اتصال مباشر: اضبط NEXT_PUBLIC_BOT_URL برابط البوت.
 *
 * إن ضُبط الاثنان يُفضَّل الوسيط.
 */
const DIRECT_URL = (process.env.NEXT_PUBLIC_BOT_URL || "").replace(/\/+$/, "");
const USE_PROXY  = process.env.NEXT_PUBLIC_USE_BOT_PROXY === "1";
const BOT_URL    = USE_PROXY ? "/bot-api" : DIRECT_URL;

/** كل كم ثانية نعيد الجلب أثناء فتح الصفحة */
const REFRESH_MS = 45_000;

type LiveItem = {
  id: number;
  branch: string;
  cat: string;
  name: string;
  active: boolean;
  price?: number;
  pricePerKg?: number;
  variants?: { name: string; price: number }[];
};

export type LiveStatus = "off" | "loading" | "live" | "error";

/* ── تطبيع عربي للمطابقة بالاسم ── */
function norm(s: string): string {
  return String(s || "")
    .replace(/[\u064B-\u0652\u0670]/g, "")
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/[ةه]/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/\u0640/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * يدمج التوفّر الحيّ في المنيو الثابت.
 * المطابقة بـ (القسم + الاسم المطبَّع). الأسماء المكررة داخل القسم
 * تُطابَق بالترتيب حتى لا يأخذ الأول حالة الثاني.
 */
export function mergeAvailability(staticMenu: MenuData, live: LiveItem[]): MenuData {
  if (!live.length) return staticMenu;

  const buckets = new Map<string, LiveItem[]>();
  for (const li of live) {
    const key = `${li.cat}|${norm(li.name)}`;
    const arr = buckets.get(key);
    if (arr) arr.push(li);
    else buckets.set(key, [li]);
  }
  const used = new Map<string, number>();

  const out: MenuData = {};
  for (const [catId, cat] of Object.entries(staticMenu)) {
    out[catId] = {
      ...cat,
      items: cat.items.map((item: MenuItem) => {
        const key = `${catId}|${norm(item.name)}`;
        const arr = buckets.get(key);
        if (!arr || !arr.length) return item;          // غير معروف للبوت — يبقى كما هو
        const idx = used.get(key) || 0;
        const match = arr[Math.min(idx, arr.length - 1)];
        used.set(key, idx + 1);
        return {
          ...item,
          active: match.active,
          // السعر من اللوحة إن كان مفرداً — الأحجام والوزن تبقى من الملف الثابت
          ...(match.price !== undefined && !item.variants && !item.pricePerKg
            ? { price: match.price }
            : {}),
        };
      }),
    };
  }
  return out;
}

/**
 * يعيد منيو الفرع مدموجاً بالتوفّر الحيّ.
 *
 *   const { menu, status, lastUpdated, refresh } = useLiveMenu(branch);
 *   const categoryData = menu[categoryId];
 */
export function useLiveMenu(branch: string) {
  const staticMenu = useMemo(() => getMenuByBranch(branch), [branch]);
  const [live, setLive] = useState<LiveItem[]>([]);
  const [status, setStatus] = useState<LiveStatus>(BOT_URL ? "loading" : "off");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchLive = useCallback(async (signal?: AbortSignal) => {
    if (!BOT_URL) { setStatus("off"); return; }
    try {
      // الوسيط يعيد كتابة /bot-api/* إلى /api/* فلا نكرّر البادئة
      const path = USE_PROXY ? "/public/menu" : "/api/public/menu";
      const r = await fetch(
        `${BOT_URL}${path}?branch=${encodeURIComponent(branch)}`,
        { signal, cache: "no-store" },
      );
      if (!r.ok) throw new Error(String(r.status));
      const d = await r.json();
      if (!d.ok || !Array.isArray(d.items)) throw new Error("رد غير متوقع");
      setLive(d.items);
      setLastUpdated(new Date());
      setStatus("live");
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      // نُبقي آخر نسخة ناجحة إن وُجدت؛ وإلا يعمل الموقع بالثابت
      setStatus((prev) => (prev === "live" ? "live" : "error"));
    }
  }, [branch]);

  useEffect(() => {
    if (!BOT_URL) return;
    const ctrl = new AbortController();
    fetchLive(ctrl.signal);

    const timer = setInterval(() => fetchLive(), REFRESH_MS);
    // إعادة الجلب عند العودة للتبويب — الزبون يرى أحدث حالة فوراً
    const onFocus = () => fetchLive();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    return () => {
      ctrl.abort();
      clearInterval(timer);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [fetchLive]);

  const menu = useMemo(
    () => (live.length ? mergeAvailability(staticMenu, live) : staticMenu),
    [staticMenu, live],
  );

  return { menu, status, lastUpdated, refresh: () => fetchLive() };
}

/** عدد الأصناف المتوفرة في قسم — مفيد لبطاقات الأقسام */
export function countActive(menu: MenuData, catId: string): number {
  const c = menu[catId];
  if (!c) return 0;
  return c.items.filter((i) => i.active !== false).length;
}
