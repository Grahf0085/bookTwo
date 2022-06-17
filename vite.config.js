import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin(), eslint()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
})
