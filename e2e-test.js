/**
 * محاكاة المتصفح مقابل بوت حيّ.
 * تشغّل منطق lib/live-menu.ts الحقيقي مع localStorage مقلَّد،
 * وتمرّ على كل سيناريو عانى منه المستخدم.
 */
const http = require('http');
const fs = require('fs');

const P = Number(process.argv[2] || 9400);
const SITE = __dirname;

/* ── localStorage مقلَّد ── */
const store = new Map();
global.window = {
  localStorage: {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, v),
    removeItem: (k) => store.delete(k),
  },
};

/* ── استخراج منطق live-menu.ts الحقيقي ── */
/**
 * يحوّل lib/live-menu.ts بمترجم TypeScript الحقيقي بدل تعبيرات نمطية هشّة،
 * ثم يستخرج الدوال التي نحتاجها.
 */
function loadLiveLogic() {
  const ts = require(`${SITE}/node_modules/typescript`);
  const src = fs.readFileSync(`${SITE}/lib/live-menu.ts`, 'utf8');
  const js = ts.transpileModule(src, {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  }).outputText;

  // نبتر كل ما يعتمد على React — نريد المنطق الخالص فقط
  const cleaned = js
    .replace(/const react_1 = require\("react"\);/, '')
    .replace(/^const menu_data_1 = require.*$/m, 'const menu_data_1 = { getMenuByBranch: () => ({}) };')
    .replace(/^const img_1 = require.*$/m, 'const img_1 = { imgSrc: (x) => x || "" };')
    .replace(/exports\.\w+\s*=\s*\w+;/g, '')
    .replace(/function useLiveMenu[\s\S]*?\n\}/, '');

  const mod = { exports: {} };
  new Function('module', 'exports', 'require', 'window',
    cleaned + '\nmodule.exports = { readCache, writeCache, buildMenu, CACHE_TRUST_MS };'
  )(mod, mod.exports, require, global.window);
  return mod.exports;
}

const L = loadLiveLogic();

/* ── طلبات ── */
function req(path, method = 'GET', body = null, ck = '') {
  return new Promise((r) => {
    const d = body ? JSON.stringify(body) : null;
    const q = http.request(
      { host: 'localhost', port: P, path, method,
        headers: { 'Content-Type': 'application/json', Cookie: ck } },
      (res) => {
        let o = '';
        res.on('data', (c) => (o += c));
        res.on('end', () => {
          let x = o; try { x = JSON.parse(o); } catch {}
          r({ body: x, cookie: res.headers['set-cookie'] });
        });
      });
    q.on('error', () => r({ body: null }));
    if (d) q.write(d); q.end();
  });
}

/** يحاكي زيارة الزبون: يقرأ النسخة المحفوظة ثم يجلب الجديد */
async function visit(branch, { skipFetch = false } = {}) {
  const cached = L.readCache(branch);
  const cacheStatus = !cached
    ? 'loading'
    : Date.now() - cached.at < L.CACHE_TRUST_MS ? 'cached' : 'stale';

  let payload = cached, status = cacheStatus;
  if (!skipFetch) {
    const d = (await req(`/api/public/menu?branch=${branch}`)).body;
    if (d && d.ok) {
      payload = { categories: d.categories, items: d.items, at: Date.now(), rev: d.rev };
      L.writeCache(branch, payload);
      status = 'live';
    }
  }
  const menu = payload ? L.buildMenu(payload) : {};
  const settled = ['live', 'cached', 'static'].includes(status);
  return { menu, status, settled };
}

/** ما تعرضه صفحة القسم */
function screen(v, catId, branch) {
  const cat = v.menu[catId];
  if (!cat && !v.settled) return 'مؤشّر: جاري تحميل القسم';
  if (!cat) return 'القسم غير موجود';
  const active = cat.items.filter((i) => i.active !== false);
  if (!active.length) {
    if (!v.settled) return 'الصفحة كاملة + مؤشّر تحميل الأصناف';
    const other = Object.entries(cat.counts || {}).find(([b, n]) => b !== branch && Number(n) > 0);
    return 'لا أصناف' + (other ? ` (متوفر في ${other[0]})` : '');
  }
  return `${active.length} صنف: ${active.map((i) => i.name + ' ' + (i.price || '') + '₪').join('، ')}`;
}

const line = (n, t) => console.log(`\n${n}) ${t}`);
const show = (label, txt) => console.log(`   ${label.padEnd(26)}${txt}`);

(async () => {
  const lg = await req('/api/auth/login', 'POST', { username: 'murad', password: 'O2-admin-2026' });
  const ck = (lg.cookie || [''])[0].split(';')[0];
  const CAT = 'mashawe';

  console.log('═══ محاكاة الزبون مقابل بوت حيّ ═══');

  line(1, 'إضافة قسم + صنف «الفرعان معاً»');
  await req('/api/cats', 'POST', { id: CAT, name: 'المشاوي', emoji: '🍖' }, ck);
  const it = await req('/api/items', 'POST',
    { name: 'مشاوي مشكلة', cat: CAT, branch: '', price: 60, desc: 'لحمة - دجاج' }, ck);
  const id = it.body.item.id;
  show('فرع غزة', screen(await visit('gaza'), CAT, 'gaza'));
  show('الفرع الأوسط', screen(await visit('middle'), CAT, 'middle'));

  line(2, 'تحديث الصفحة (من النسخة المحفوظة قبل الجلب)');
  show('غزة — لحظة الرسم', screen(await visit('gaza', { skipFetch: true }), CAT, 'gaza'));
  show('الأوسط — لحظة الرسم', screen(await visit('middle', { skipFetch: true }), CAT, 'middle'));

  line(3, 'تبديل الصنف إلى فرع غزة فقط');
  await req(`/api/items/${id}`, 'PUT', { branch: 'gaza' }, ck);
  show('فرع غزة', screen(await visit('gaza'), CAT, 'gaza'));
  show('الفرع الأوسط', screen(await visit('middle'), CAT, 'middle'));

  line(4, 'تغيير السعر 60 ← 75');
  await req(`/api/items/${id}`, 'PUT', { price: 75 }, ck);
  show('فرع غزة', screen(await visit('gaza'), CAT, 'gaza'));

  line(5, 'إغلاق الصنف');
  await req(`/api/items/${id}`, 'PUT', { active: false }, ck);
  show('فرع غزة', screen(await visit('gaza'), CAT, 'gaza'));

  line(6, 'إعادة التفعيل وإرجاعه للفرعين');
  await req(`/api/items/${id}`, 'PUT', { active: true, branch: '' }, ck);
  show('فرع غزة', screen(await visit('gaza'), CAT, 'gaza'));
  show('الفرع الأوسط', screen(await visit('middle'), CAT, 'middle'));

  line(7, 'نسخة قديمة في المتصفح (أقدم من دقيقتين)');
  const old = L.readCache('middle');
  old.at = Date.now() - 10 * 60 * 1000;
  old.items = old.items.filter((i) => i.cat !== CAT);   // كما كانت قبل الإضافة
  L.writeCache('middle', old);
  const stale = await visit('middle', { skipFetch: true });
  show('الحالة', stale.status + (stale.settled ? ' (مستقرّة)' : ' (تنتظر الجديد)'));
  show('ما يظهر', screen(stale, CAT, 'middle'));
  show('بعد وصول الجديد', screen(await visit('middle'), CAT, 'middle'));

  line(8, 'حذف الصنف ثم القسم');
  await req(`/api/items/${id}`, 'DELETE', {}, ck);
  show('بعد حذف الصنف', screen(await visit('gaza'), CAT, 'gaza'));
  await req(`/api/cats/${CAT}`, 'DELETE', { force: true }, ck);
  show('بعد حذف القسم', screen(await visit('gaza'), CAT, 'gaza'));

  console.log('\n═══ انتهت ═══');
  process.exit(0);
})();
