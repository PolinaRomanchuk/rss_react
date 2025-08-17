import createNextIntlPlugin from 'next-intl/plugin';
/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: './dist',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: { unoptimized: true },
};

export default createNextIntlPlugin(nextConfig);
