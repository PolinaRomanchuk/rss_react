/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
});
