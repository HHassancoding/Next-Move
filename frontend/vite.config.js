import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      'localhost',
      'ngrok-free.dev',
      'next-move-frontend.ngrok-free.dev',
      'https://unequal-recluse-parking.ngrok-free.dev',
      '.ngrok-free.dev',
      'unequal-recluse-parking.ngrok-free.dev'

    ],
    proxy: {
      '/api': {
        target: 'https://next-move-y9tw.onrender.com',
        changeOrigin: true
      }
    }
  }
})