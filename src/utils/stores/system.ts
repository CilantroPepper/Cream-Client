import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { config } from '../../config'
import { cc } from '../tools'

export const useSystem = defineStore('system', () => {
    // 全屏加载节点
    const globalLoader = <HTMLElement>document.querySelector('.app-loading-root')
    const layoutLoader = ref<{ close(): any } | null>(null)
    // 全局设备状态: PC或WAP
    const device = ref<'PC' | 'WAP'>('PC')
    // 当前正在访问的Stack页面
    const currentStack = ref<string>(config.app.TITLE)
    // 设备宽高
    const screen = ref({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })
    // PWA
    const pwaEvent = ref<Event | null>(null)
    /** getters */

    const isWap = computed(() => device.value === 'WAP')

    const supportPWA = Boolean(device.value)

    /** actions */

    // 设置设备类型
    function setDevice(detail: 'PC' | 'WAP') {
        device.value = detail
    }

    // 设置当前(即将)访问的Stack页面
    function setCurrentStack(detail?: string) {
        currentStack.value = detail ?? config.app.TITLE
    }

    // 设置pwa事件
    function setPwaEvent(e: Event | null) {
        pwaEvent.value = e
    }

    // 设置屏幕参数
    function setScreen(detail: { width: number, height: number }) {
        screen.value = detail
    }

    /**
     * 切换加载状态
     * @param loading 是否加载
     * @param fullScreen 是否全屏
     */
    function setLoading(loading: boolean, fullScreen = false) {
        if (fullScreen) {
            globalLoader.style.setProperty('display', loading ? 'flex' : 'none')
            return
        }
        if (loading) {
            layoutLoader.value = cc.loading('努力加载中...')
        } else {
            layoutLoader.value?.close?.()
            layoutLoader.value = null
        }

    }

    return {
        device, screen, currentStack, pwaEvent,
        isWap, supportPWA,
        setDevice, setCurrentStack, setScreen, setPwaEvent, setLoading
    }
})