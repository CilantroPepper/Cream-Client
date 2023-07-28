import { config } from '../config'
import { useSystem } from './stores/system'

/**
 * 应用初始化
 */
export function init() {
    const system = useSystem()
    const width = document.documentElement.clientWidth
    const colors = config.color
    // 设置全局设备类型
    system.setDevice(width >= config.app.STANDARD_WIDTH ? 'PC' : 'WAP')
    // 初始化颜色
    Object.entries(colors).forEach(item => {
        document.body.style.setProperty(`--GLOBAL-${item[0].replace('_', '-')}`, item[1])
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

    window.addEventListener('resize', () => {
        const width = document.documentElement.clientWidth
        const height = document.documentElement.clientHeight
        console.log('Client Screen', { width, height })
        // 设置全局设备类型
        system.setDevice(width >= config.app.STANDARD_WIDTH ? 'PC' : 'WAP')
        // 设置全局屏幕信息
        system.setScreen({
            width, height
        })
    })

    // 初始化PWA
    window.addEventListener('beforeinstallprompt', e => {
        system.setPwaEvent(e)
    });

    // 移除加载动画
    system.setLoading(false)
}