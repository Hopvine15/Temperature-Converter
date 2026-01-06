import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins:  [react(), tailwindcss()],
  resolve: {
    alias:  {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
  css: {
    preprocessorOptions:  {
      scss: {
        // Suppress deprecation warnings from Carbon
        silenceDeprecations: ['legacy-js-api'],
        quietDeps: true,
      },
    },
  },
  base: '/Temperature-Converter/', // For GitHub Pages
})