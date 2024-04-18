import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({jsxRuntime: 'classic'})],
  resolve: {
    alias: {
      components: "/src/components",
      layouts: "/src/layouts",
      pages: "/src/pages",
      utils: "/src/utils",
      assets: "/src/assets",
      routes: "/src/routes",
      hooks: "/src/hooks",
      context: "/src/context",
      api: "/src/api",
      helpers: "/src/helpers",
      locales: "/src/locales",
      models: "/src/models",
      env: "/src/env",
      src: "/src",
      "@": path.resolve(__dirname, "./@"),
    },
  },
})
