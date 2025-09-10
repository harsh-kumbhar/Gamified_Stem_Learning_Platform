import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Student app config
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5000"
    }
  },
  plugins: [react()],
  base: '/student/',   // important: matches your express path
})
