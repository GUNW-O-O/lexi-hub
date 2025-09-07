import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  server : {
    proxy : {
      '/api' : {
        target : 'http://localhost:3000',
        changeOrigin : true,
        secure : false,
        rewrite : (path) => path.replace(/^\/api/, '')
      }
    }
  }
})