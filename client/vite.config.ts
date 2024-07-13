import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [svelte({
    hot: false,
  })],
  publicDir: 'public',
  build: {
    rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
        },
    },
},
})
