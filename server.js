/**
 * خادم Next.js مخصّص — يربط التطبيق بمنفذ المنصة.
 *
 * سكربت start في package.json يشير إلى هذا الملف. Render وغيره
 * يمرّرون المنفذ عبر متغيّر PORT، ويجب الاستماع على 0.0.0.0
 * لا على localhost وإلا لم تصل الطلبات من الخارج.
 */
const { createServer } = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);
const hostname = "0.0.0.0";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res).catch((err) => {
        console.error("خطأ في معالجة الطلب:", req.url, err);
        res.statusCode = 500;
        res.end("خطأ داخلي");
      });
    }).listen(port, hostname, () => {
      console.log(`✅ الموقع شغّال على http://${hostname}:${port}`);
      console.log(`   البيئة: ${dev ? "تطوير" : "إنتاج"}`);
      console.log(
        `   ربط البوت: ${
          process.env.BOT_ORIGIN
            ? process.env.BOT_ORIGIN + " (عبر الوسيط)"
            : process.env.NEXT_PUBLIC_BOT_URL
            ? process.env.NEXT_PUBLIC_BOT_URL + " (مباشر)"
            : "⚠️ غير مضبوط — التوفّر الحيّ معطّل"
        }`,
      );
    });
  })
  .catch((err) => {
    console.error("❌ فشل إقلاع Next.js:", err);
    process.exit(1);
  });
