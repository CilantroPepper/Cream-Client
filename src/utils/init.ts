import { config } from '../config'
import { useSystem } from './stores/system'
import { App } from 'vue'
import button from './directive/button.ts'
import ripple from './directive/ripple.ts'
import EnhancedButton from '../components/Button/EnhancedButton.tsx'
import CcButton from '@/components/Button/CcButton.vue'

export function initialize() {
    const system = useSystem()
    const width = document.documentElement.clientWidth
    const colors = config.color
    // 设置全局设备类型
    system.setDevice(width >= config.app.STANDARD_WIDTH ? 'PC' : 'WAP')
    // 初始化颜色
    Object.entries(colors).forEach(item => {
        document.body.style.setProperty(`--GLOBAL-${ item[0].replace('_', '-') }`, item[1])
    })
    // 设置响应式基准
    document.body.style.setProperty('--PC-MIN-WIDTH', config.app.STANDARD_WIDTH + 'px')
    document.body.style.setProperty('--WAP-MAX-WIDTH', config.app.STANDARD_WIDTH - 1 + 'px')
    // 初始化animate.css的全局默认动画时间
    document.documentElement.style.setProperty('--animate-duration', '.5s')
    // 初始化全局ElementPlus主题色
    document.body.style.setProperty('--el-color-primary', config.color.DARK_BLUE)
    document.body.style.setProperty('--el-color-primary-light-3', config.color.BLUE)
    document.body.style.setProperty('--el-color-primary-light-8', config.color.LIGHT_BLUE)

    window.onresize = () => {
        const width = document.documentElement.clientWidth
        const height = document.documentElement.clientHeight
        console.log('Client Screen', { width, height })
        // 设置全局设备类型
        system.setDevice(width >= config.app.STANDARD_WIDTH ? 'PC' : 'WAP')
        // 设置全局屏幕信息
        system.setScreen({
            width, height
        })
    }

    // 初始化PWA
    (<any>window).onbeforeinstallprompt = (e: Event) => {
        system.setPwaEvent(e)
    }

    // 移除加载动画
    system.setLoading(false, true)
}

/**
 * 应用初始化
 */
export default {
    install(app: App) {
        app.use(button) // 安装自定义指令 v-btn，解决element-plus按钮点击不失焦的BUG
            .use(ripple) // 自定义指令 v-ripple，点击水波纹效果
            .component('plus-button', EnhancedButton) // 增强型按钮
            .component('cc-button', CcButton) // CC Button
        initialize()
    }
}