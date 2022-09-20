// vite.config.js
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      name: '@oxide/identicon',
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
})
