import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: []
  },
  plugins: [
    vue({
      isProduction: true,
    }),
    dts({
      entryRoot: "./src/",
    })
  ], 
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "VueMfModule",
      fileName: (format) => `index.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        sourcemap: "inline",
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})