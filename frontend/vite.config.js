import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  base: '/frontend/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  preview: {
    port: 8000,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: '0.0.0.0',
  },
})
