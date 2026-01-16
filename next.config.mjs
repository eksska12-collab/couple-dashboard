
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 성능 최적화 설정
  compress: true,
  swcMinify: true,

  // 이미지 최적화
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 번들 분석 및 최적화
  webpack: (config, { dev, isServer }) => {
    // 프로덕션 빌드에서 소스맵 최적화
    if (!dev && !isServer) {
      config.devtool = 'hidden-source-map';
    }
    return config;
  },

  // 실험적 기능 활성화
  experimental: {
    optimizeCss: true,
  },

  // 프로덕션 환경에서 React DevTools 비활성화
  reactStrictMode: true,

  // 정적 페이지 최적화
  poweredByHeader: false,
};

export default nextConfig;
