/**
 * مصدر صور المنيو.
 *
 * الترتيب:
 *  1. رابط كامل على الصنف       → يُستخدم كما هو
 *  2. NEXT_PUBLIC_IMAGE_BASE     → يُسبق المسار النسبي (يعمل بلا إعداد خادم)
 *  3. المسار كما هو              → يُخدَم من public، أو عبر rewrite إلى البوت
 */

const IMAGE_BASE = (process.env.NEXT_PUBLIC_IMAGE_BASE || "").replace(/\/+$/, "");

/** يصلح المسارات المشوّهة: public/menu/… أو menu/… ← /menu/… */
export function normalizeImagePath(raw?: string): string {
  const p = String(raw || "").trim();
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  const m = p.match(/\/?menu\/.*$/i);
  return m ? "/" + m[0].replace(/^\/+/, "") : p;
}

/** يبني رابط الصورة النهائي */
export function imgSrc(raw?: string): string {
  const p = normalizeImagePath(raw);
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  return IMAGE_BASE ? IMAGE_BASE + p : p;
}

export const IMAGE_CONFIG = { base: IMAGE_BASE, usingExternal: Boolean(IMAGE_BASE) };
