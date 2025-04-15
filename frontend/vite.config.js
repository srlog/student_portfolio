import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  publicDir: 'public',
  server: {
    // When hosting on Firebase, it expects a single page application
    // and will serve the index.html for any route that doesn't match a file
    // Vite will also do this when in development mode, so we don't need to
    // specify this option. However, when hosting on Firebase, we need to
    // specify this option so that Vite knows to serve the index.html for
    // any route that doesn't match a file.
    // https://vitejs.dev/config/#server-fallback
    fallback: 'index.html',
  },
})
