import { fileURLToPath, URL } from "url";

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import typescript from '@rollup/plugin-typescript';
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      name: "wt-mf-module",
      entry: resolve(__dirname, "src/index.ts"),
      fileName: "wt-mf-module",
      formats: [
        "es",
        "umd"
      ]
    },
    rollupOptions: {
      external: [
        'vue'
      ],
      plugins: [
        typescript({
          declaration: true,
          declarationDir: resolve(__dirname, 'dist'),
          rootDir: resolve(__dirname, 'src'),
          exclude: resolve(__dirname, 'node_modules/**')
        })
      ]
    }
  },
  plugins: [vue({
    reactivityTransform: true
  }), dts()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
