import { defineConfig } from 'vite';
import { resolve } from 'path';
import eslint from 'vite-plugin-eslint';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

export default defineConfig({
  publicDir: 'public',
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        root: resolve(__dirname, 'index.html'),
        task_1: resolve(__dirname, 'tasks/01-line-chart/index.html'),
        task_2: resolve(__dirname, 'tasks/02-pie-chart/index.html'),
      },
    },
  },
  plugins: [
    eslint({
      cache: false,
      fix: true,
    }),
    ViteMinifyPlugin({}),
  ],
  resolve: {
    alias: {
      '@utils': resolve(__dirname, 'utils'),
    },
  },
});
