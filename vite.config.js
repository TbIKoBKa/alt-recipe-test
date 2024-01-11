import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  base: '/',
  appType: 'spa',
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [
    react({
      babel: {
        plugins: ['macros'],
      },
    }),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        // svgr options
      },
    }),
    createHtmlPlugin({
      entry: '/src/index.tsx',
      template: 'public/index.html',
    }),
    splitVendorChunkPlugin(),
  ],
  server: {
    open: true,
    port: 3000,
  },
});
