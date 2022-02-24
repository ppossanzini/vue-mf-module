import { fileURLToPath, URL } from "url";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: "vue-mf-module",
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "vue-mf-module",
      formats: [
        "es",
        "umd"
      ]
    },
    rollupOptions: {
      external: [
          'vue'
      ]
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
