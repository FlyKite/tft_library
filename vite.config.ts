import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: '云顶看板',
        short_name: '云顶看板',
        description: '云顶看板 - S11画中灵',
        theme_color: '#212121',
        background_color: '#212121',
        lang: 'zh-cn',
        icons: [
          {
            src: './images/logo.png',
            sizes: '256x256',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0'
  }
})