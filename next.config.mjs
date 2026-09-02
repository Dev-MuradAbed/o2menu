// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ تفعيل الإصدار المستقل (يضمن وجود server.js ويصغّر الحجم)
  output: 'standalone',

  // ✅ إعدادات TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ✅ إعدادات الصور
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // أضف أي نطاقات خارجية أخرى تستخدمها هنا (مثلاً لو عندك صور من o2menu)
      // {
      //   protocol: 'https',
      //   hostname: 'o2menu.onrender.com',
      //   pathname: '/**',
      // },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ✅ وضع صارم
  reactStrictMode: true,
  
  // ✅ حذف الـ console.log في الإنتاج
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ✅ الـ Rewrites الخاصة بالـ Bot
  async rewrites() {
    const bot = (process.env.BOT_ORIGIN || '').replace(/\/+$/, '');
    if (!bot) return [];
    return [
      { source: '/bot-api/:path*', destination: `${bot}/api/:path*` },
    ];
  },

  // ✅ رؤوس الأمان
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
