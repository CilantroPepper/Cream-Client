import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
    plugins: [
        vue(),
        vueJsxPlugin({}),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        ElementPlus({
            useSource: true,
        })
    ],
    // 运行时根路径，若要修改请在 `.env.development` 或 `.env.production` 进行
    base: loadEnv(mode, process.cwd()).VITE_BASE,
    resolve: {
        alias: {
            '@/': `${resolve(__dirname, './src')}/`,
            '~/': `${resolve(__dirname, './')}`
        }
    },
    server: {
        // DEV服务器的端口，若要修改请在 `.env.development` 进行
        port: Number(loadEnv(mode, process.cwd()).VITE_DEV_PORT)
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/styles/global.scss" as *; @use "@/assets/styles/element.scss" as *;`
            }
        }
    }
})
