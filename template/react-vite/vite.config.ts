import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import postcssNesting from 'postcss-nesting';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      tsDecorators: true,
    }),
    svgr(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 8000,
  },
  preview: {
    port: 8080,
  },
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
  esbuild: {
    drop: mode === 'production' ? ['console'] : [],
  },
}));
