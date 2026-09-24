import type { NextConfig } from 'next';
import { resolveApiBaseUrl } from './lib/api/config';

const isProduction = process.env.NODE_ENV === 'production';
const apiBaseUrl = resolveApiBaseUrl(process.env.NEXT_PUBLIC_API_URL);
const apiOrigin = apiBaseUrl === '' ? '' : new URL(apiBaseUrl).origin;
const contentSecurityPolicy = [
  "default-src 'self'",
  `connect-src 'self'${apiOrigin === '' ? '' : ` ${apiOrigin}`}`,
  "font-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob:",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isProduction ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "base-uri 'self'",
  ...(isProduction ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
  {
    key: isProduction ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only',
    value: contentSecurityPolicy,
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  ...(isProduction
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), geolocation=(), microphone=(), payment=(), usb=()',
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  transpilePackages: ['next-themes'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [];
  },
};

export default nextConfig;
