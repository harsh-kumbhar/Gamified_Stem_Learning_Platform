import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Student app config
export default defineConfig({
  plugins: [react()],
  base: '/student/',   // important: matches your express path
})
