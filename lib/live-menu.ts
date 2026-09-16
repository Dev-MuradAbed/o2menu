"use client";

/**
 * مصدر المنيو الموحّد.
 *
 * ══ المبدأ ══
 * لوحة التحكم هي المصدر الوحيد للحقيقة. الموقع يعرض ما فيها:
 * الأقسام والأصناف والأسعار والمكونات والصور وحالة التوفّر.
 * أي إضافة أو تعديل أو حذف يظهر هنا مباشرة بلا نشر.
 *
 * ══ لماذا تغيّر هذا ══
 * كان menu-data.ts مصدراً موازياً يُدمج مع بيانات البوت. الازدواجية
 * سبّبت: أقساماً جديدة لا تظهر، وأصنافاً محذوفة تبقى، و«القسم غير
 * موجود» عند التحديث لأن الثابت يُرسم أولاً.
 *
 * ══ الاحتياطي ══
 * 1) آخر نسخة ناجحة محفوظة في المتصفح — تظهر فوراً عند التحديث
 * 2) menu-data.ts — إن لم يسبق للزائر أن حمّل شيئاً والبوت غير متاح
 *
 * فلا تظهر صفحة فارغة في أي حال.
 */

import { useEffect, useState, useMemo, useCallback } from "react";
import { getMenuByBranch, type MenuData, type MenuItem } from "./menu-data";
import { imgSrc } from "./img";

const DIRECT_URL = (process.env.NEXT_PUBLIC_BOT_URL || "").replace(/\/+$/, "");
const USE_PROXY = process.env.NEXT_PUBLIC_USE_BOT_PROXY === "1";
const BOT_URL = USE_PROXY ? "/bot-api" : DIRECT_URL;

/** بلا إعداد نطاق نستعمل مساراً نسبياً — قاعدة rewrites توجّهه للبوت */
const ENDPOINT = USE_PROXY
  ? "/bot-api/public/menu"
  : DIRECT_URL
  ? `${DIRECT_URL}/api/public/menu`
  : "/api/public/menu";

const REFRESH_MS = 45_000;
const CACHE_KEY = "o2-menu-cache-v2";

export const LIVE_CONFIG = {
  useProxy: USE_PROXY,
  directUrl: DIRECT_URL,
  resolvedBase: BOT_URL,
  endpoint: ENDPOINT,
  configured: true, // يعمل دائماً: نطاق صريح أو وسيط أو مسار نسبي
};

type LiveItem = {
  id: number;
  branch: string;
  cat: string;
  name: string;
  active: boolean;
  price?: number;
  pricePerKg?: number;
  variants?: { name: string; price: number }[];
  desc?: string;
  image?: string;
};

type LiveCategory = {
  id: string;
  name: string;
  label?: string;
  emoji?: string;
  byWeight?: boolean;
  order?: number;
};

type Payload = { categories: LiveCategory[]; items: LiveItem[]; at: number };

/** live = من البوت · cached = آخر نسخة محفوظة · static = الملف · loading */
export type LiveStatus = "loading" | "live" | "cached" | "static";

/* ── تخزين مؤقت في المتصفح ── */

function readCache(branch: string): Payload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(`${CACHE_KEY}:${branch}`);
    if (!raw) return null;
    const p = JSON.parse(raw) as Payload;
    if (!p || !Array.isArray(p.items) || !p.items.length) return null;
    return p;
  } catch {
    return null;
  }
}

function writeCache(branch: string, p: Payload) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(`${CACHE_KEY}:${branch}`, JSON.stringify(p));
  } catch {
    /* المساحة ممتلئة أو التخزين معطّل — غير حرج */
  }
}

/** يحوّل رد البوت إلى شكل المنيو الذي تعرضه الصفحات */
export function buildMenu(payload: Payload): MenuData {
  const cats = [...payload.categories].sort(
    (a, b) => (a.order || 999) - (b.order || 999),
  );

  const out: MenuData = {};
  for (const c of cats) {
    out[c.id] = {
      title: c.label || c.name || c.id,
      byWeight: Boolean(c.byWeight),
      items: [],
    } as MenuData[string];
  }

  for (const i of payload.items) {
    if (!out[i.cat]) {
      // صنف في قسم غير مُعلَن — ننشئه بدل إسقاط الصنف
      out[i.cat] = { title: i.cat, byWeight: false, items: [] } as MenuData[string];
    }
    out[i.cat].items.push({
      name: i.name,
      desc: i.desc || "",
      image: imgSrc(i.image),
      active: i.active,
      ...(i.pricePerKg ? { pricePerKg: i.pricePerKg } : {}),
      ...(i.variants && i.variants.length ? { variants: i.variants } : {}),
      ...(!i.pricePerKg &&
      !(i.variants && i.variants.length) &&
      i.price !== undefined
        ? { price: i.price }
        : {}),
    } as MenuItem);
  }
  return out;
}

/** يصلح مسارات صور المنيو الثابت لتمرّ بنفس منطق imgSrc */
function normalizeStatic(menu: MenuData): MenuData {
  const out: MenuData = {};
  for (const [k, c] of Object.entries(menu)) {
    out[k] = { ...c, items: c.items.map((i) => ({ ...i, image: imgSrc(i.image) })) };
  }
  return out;
}

/**
 * منيو الفرع من لوحة التحكم.
 *
 *   const { menu, status, lastUpdated, refresh } = useLiveMenu(branch);
 */
export function useLiveMenu(branch: string) {
  const [payload, setPayload] = useState<Payload | null>(() => readCache(branch));
  const [status, setStatus] = useState<LiveStatus>(() =>
    readCache(branch) ? "cached" : "loading",
  );
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchLive = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const r = await fetch(
          `${ENDPOINT}?branch=${encodeURIComponent(branch)}`,
          { signal, cache: "no-store" },
        );
        if (!r.ok) throw new Error(String(r.status));
        const d = await r.json();
        if (!d.ok || !Array.isArray(d.items)) throw new Error("رد غير متوقع");

        const p: Payload = {
          categories: Array.isArray(d.categories) ? d.categories : [],
          items: d.items,
          at: Date.now(),
        };
        setPayload(p);
        writeCache(branch, p);
        setLastUpdated(new Date());
        setStatus("live");
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        // نُبقي ما لدينا: نسخة محفوظة أو الملف الثابت
        setStatus((prev) => (prev === "live" ? "live" : readCache(branch) ? "cached" : "static"));
      }
    },
    [branch],
  );

  useEffect(() => {
    const cached = readCache(branch);
    if (cached) {
      setPayload(cached);
      setStatus("cached");
    } else {
      setPayload(null);
      setStatus("loading");
    }

    const ctrl = new AbortController();
    fetchLive(ctrl.signal);

    const timer = setInterval(() => fetchLive(), REFRESH_MS);
    const onFocus = () => fetchLive();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);

    return () => {
      ctrl.abort();
      clearInterval(timer);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [branch, fetchLive]);

  const menu = useMemo(() => {
    if (payload) return buildMenu(payload);
    return normalizeStatic(getMenuByBranch(branch));
  }, [payload, branch]);

  /** true متى صار الحكم بعدم وجود قسم آمناً */
  const settled = status === "live" || status === "cached" || status === "static";

  return { menu, status, settled, lastUpdated, refresh: () => fetchLive() };
}

/** عدد الأصناف المتوفرة في قسم */
export function countActive(menu: MenuData, catId: string): number {
  const c = menu[catId];
  if (!c) return 0;
  return c.items.filter((i) => i.active !== false).length;
}
