import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})