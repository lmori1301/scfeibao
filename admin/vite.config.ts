import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

function getPackageName(id: string) {
  const match = id.match(/node_modules\/((?:@[^/]+\/)?[^/]+)/)
  return match?.[1]?.replace('/', '-') ?? 'vendor'
}

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    host: true,
    port: 5177,
    allowedHosts: ['dev.scfb.org.cn', '192.168.2.189', 'localhost', '127.0.0.1'],
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://localhost:3003',
        changeOrigin: true
      },
      '/_AMapService': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@wangeditor')) {
            return `editor-${getPackageName(id)}`
          }
          if (id.includes('element-plus')) {
            return 'element-plus'
          }
          if (id.includes('@element-plus')) {
            return 'element-plus-utils'
          }
          if (id.includes('@vue') || id.includes('/vue/') || id.includes('vue-router') || id.includes('pinia')) {
            return 'vue-core'
          }
          if (id.includes('axios')) {
            return 'http'
          }
          if (id.includes('node_modules')) {
            return `vendor-${getPackageName(id)}`
          }
        }
      }
    }
  }
})
