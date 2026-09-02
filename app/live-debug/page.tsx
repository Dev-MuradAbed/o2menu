"use client";

/**
 * صفحة تشخيص الربط بالبوت — افتح /live-debug
 * تكشف سبب عدم تحديث التوفّر أو عدم ظهور الصور، بخطوات مرتّبة.
 */

import { useEffect, useState } from "react";
import { LIVE_CONFIG, useLiveMenu } from "../../lib/live-menu";
import { getMenuByBranch } from "../../lib/menu-data";

type Check = { label: string; state: "ok" | "bad" | "warn"; detail: string; fix?: string };

export default function LiveDebugPage() {
  const [branch, setBranch] = useState("gaza");
  const { menu, status, lastUpdated, refresh } = useLiveMenu(branch);
  const [raw, setRaw] = useState<any>(null);
  const [rawErr, setRawErr] = useState("");
  const [imgOk, setImgOk] = useState<boolean | null>(null);

  // طلب مباشر لنرى الرد الخام
  useEffect(() => {
    if (!LIVE_CONFIG.configured) return;
    const url = `${LIVE_CONFIG.endpoint}?branch=${branch}`;
    fetch(url, { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        setRaw(await r.json());
        setRawErr("");
      })
      .catch((e) => { setRaw(null); setRawErr(e.message); });
  }, [branch]);

  // اختبار صورة من مجلد الموقع نفسه
  useEffect(() => {
    const staticMenu = getMenuByBranch(branch);
    const first = Object.values(staticMenu)
      .flatMap((c: any) => c.items)
      .find((i: any) => i.image);
    if (!first) { setImgOk(false); return; }
    const img = new Image();
    img.onload = () => setImgOk(true);
    img.onerror = () => setImgOk(false);
    img.src = (first as any).image;
  }, [branch]);

  const staticMenu = getMenuByBranch(branch);
  const staticCount = Object.values(staticMenu).reduce((n, c: any) => n + c.items.length, 0);
  const liveCount = raw?.items?.length ?? 0;
  const inactiveLive = raw?.items?.filter((i: any) => !i.active).length ?? 0;
  const inactiveMerged = Object.values(menu).reduce(
    (n, c: any) => n + c.items.filter((i: any) => i.active === false).length, 0);

  const checks: Check[] = [
    LIVE_CONFIG.configured
      ? { label: "إعدادات البناء", state: "ok",
          detail: LIVE_CONFIG.useProxy
            ? `وسيط مفعّل → ${LIVE_CONFIG.endpoint}`
            : `اتصال مباشر → ${LIVE_CONFIG.endpoint}` }
      : { label: "إعدادات البناء", state: "bad",
          detail: "لم يصل أي رابط للبوت إلى البناء",
          fix: "اضبط BOT_ORIGIN و NEXT_PUBLIC_USE_BOT_PROXY=1 في متغيرات بيئة المنصة، ثم أعد النشر (Redeploy). متغيرات NEXT_PUBLIC_ تُدمج وقت البناء لا وقت التشغيل." },

    raw
      ? { label: "الاتصال بالبوت", state: "ok", detail: `وصل ${liveCount} صنفاً · ${inactiveLive} مغلق` }
      : { label: "الاتصال بالبوت", state: "bad",
          detail: rawErr || "لا رد",
          fix: rawErr.includes("404")
            ? "الوسيط غير مضبوط أو الرابط خاطئ. تأكد من BOT_ORIGIN وأعد النشر."
            : rawErr.includes("Failed to fetch")
            ? "CORS أو خدمة نائمة. جرّب فتح رابط النقطة في تبويب جديد."
            : "تأكد أن خدمة البوت تعمل، وافتح /api/public/menu في المتصفح." },

    inactiveLive > 0
      ? (inactiveMerged > 0
          ? { label: "الدمج مع منيو الموقع", state: "ok",
              detail: `${inactiveMerged} صنفاً مخفياً بعد الدمج` }
          : { label: "الدمج مع منيو الموقع", state: "bad",
              detail: `البوت يقول ${inactiveLive} مغلق، لكن لا شيء اختفى`,
              fix: "الأسماء لا تتطابق بين menu-data.ts وقاعدة البوت. راجع الجدول أسفل الصفحة." })
      : { label: "الدمج مع منيو الموقع", state: "warn",
          detail: "لا صنف مغلق في البوت الآن — أغلق صنفاً من اللوحة ثم أعد تحميل هذه الصفحة" },

    imgOk === null
      ? { label: "صور الموقع", state: "warn", detail: "جاري الفحص…" }
      : imgOk
      ? { label: "صور الموقع", state: "ok", detail: "الصور تُحمَّل من مجلد الموقع" }
      : { label: "صور الموقع", state: "bad",
          detail: "تعذّر تحميل صورة نموذجية",
          fix: "تأكد أن مجلد public/menu مرفوع مع الموقع. المنصات تتجاهله أحياناً إن تجاوز حد الحجم." },
  ];

  // أصناف يعرفها البوت ولا يجدها الموقع والعكس
  const norm = (s: string) => s.replace(/[إأآ]/g, "ا").replace(/ى/g, "ي").replace(/[ةه]/g, "ه").replace(/\s+/g, " ").trim().toLowerCase();
  const siteNames = new Set(Object.entries(staticMenu).flatMap(([c, v]: any) => v.items.map((i: any) => `${c}|${norm(i.name)}`)));
  const botNames = new Set((raw?.items || []).map((i: any) => `${i.cat}|${norm(i.name)}`));
  const onlyBot = [...botNames].filter((x) => !siteNames.has(x as string)).slice(0, 10);
  const onlySite = [...siteNames].filter((x) => !botNames.has(x as string)).slice(0, 10);

  const color = (s: string) => (s === "ok" ? "#16a34a" : s === "bad" ? "#dc2626" : "#ca8a04");

  return (
    <div dir="rtl" style={{ fontFamily: "system-ui, sans-serif", padding: 20, maxWidth: 760, margin: "0 auto", lineHeight: 1.9 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800 }}>🩺 تشخيص الربط بالبوت</h1>

      <div style={{ margin: "14px 0" }}>
        الفرع:{" "}
        {["gaza", "middle"].map((b) => (
          <button key={b} onClick={() => setBranch(b)}
            style={{ marginInlineEnd: 8, padding: "6px 14px", borderRadius: 8, cursor: "pointer",
              border: "1px solid #ccc", background: branch === b ? "#16a34a" : "#fff",
              color: branch === b ? "#fff" : "#333", fontFamily: "inherit" }}>
            {b === "gaza" ? "غزة" : "الأوسط"}
          </button>
        ))}
        <button onClick={refresh} style={{ padding: "6px 14px", borderRadius: 8, cursor: "pointer", border: "1px solid #ccc", fontFamily: "inherit" }}>🔄 إعادة الفحص</button>
      </div>

      {checks.map((c, i) => (
        <div key={i} style={{ border: `1px solid ${color(c.state)}33`, borderInlineStart: `4px solid ${color(c.state)}`,
          borderRadius: 10, padding: "11px 14px", marginBottom: 10, background: `${color(c.state)}0d` }}>
          <b style={{ color: color(c.state) }}>
            {c.state === "ok" ? "✅" : c.state === "bad" ? "❌" : "⚠️"} {c.label}
          </b>
          <div style={{ fontSize: 13, wordBreak: "break-all" }}>{c.detail}</div>
          {c.fix && <div style={{ fontSize: 12.5, color: "#666", marginTop: 5 }}>→ {c.fix}</div>}
        </div>
      ))}

      <h2 style={{ fontSize: 16, fontWeight: 700, marginTop: 22 }}>الأرقام</h2>
      <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
        <tbody>
          {[
            ["أصناف الموقع الثابتة", staticCount],
            ["أصناف وصلت من البوت", liveCount],
            ["مغلق حسب البوت", inactiveLive],
            ["مخفي فعلياً بعد الدمج", inactiveMerged],
            ["حالة الجلب", status],
            ["آخر تحديث", lastUpdated ? lastUpdated.toLocaleTimeString("ar-EG") : "—"],
          ].map(([k, v]) => (
            <tr key={String(k)}><td style={{ padding: "5px 0", color: "#666" }}>{k}</td>
              <td style={{ padding: "5px 0", fontWeight: 700 }}>{String(v)}</td></tr>
          ))}
        </tbody>
      </table>

      {(onlyBot.length > 0 || onlySite.length > 0) && (
        <>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginTop: 22 }}>أسماء لا تتطابق</h2>
          <div style={{ fontSize: 12.5, color: "#666" }}>
            هذه الأصناف لن يتأثر توفّرها لأن اسمها مختلف بين الموقع والبوت.
          </div>
          {onlySite.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <b style={{ fontSize: 13 }}>في الموقع فقط:</b>
              <div style={{ fontSize: 12, color: "#666" }}>{onlySite.join(" · ")}</div>
            </div>
          )}
          {onlyBot.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <b style={{ fontSize: 13 }}>في البوت فقط:</b>
              <div style={{ fontSize: 12, color: "#666" }}>{onlyBot.join(" · ")}</div>
            </div>
          )}
        </>
      )}

      <div style={{ marginTop: 22, fontSize: 12, color: "#888" }}>
        احذف مجلد <code>app/live-debug</code> قبل النشر النهائي إن أردت إخفاء هذه الصفحة.
      </div>
    </div>
  );
}
