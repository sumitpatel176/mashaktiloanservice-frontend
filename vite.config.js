import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Tailwind plugin import kiya

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Plugins ki list me add kiya
  ],
})