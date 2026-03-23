import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.7.23:8084',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/storage': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
