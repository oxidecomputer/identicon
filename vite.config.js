// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      name: '@oxide/identicon',
    },
  },
})
