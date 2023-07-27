import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { config } from '../../config'

export const useSystem = defineStore('system', () => {
    // 全局设备状态: PC或WAP
    const device = ref<'PC' | 'WAP'>('PC')
    // 当前正在访问的Stack页面
    const currentStack = ref<string>(config.app.TITLE)
    // 设备宽高
    const screen = ref({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })
    /** getters */

    const isWap = computed(() => device.value === 'WAP')

    /** actions */

    // 设置设备类型
    function setDevice(detail: 'PC' | 'WAP') {
        device.value = detail
    }

    // 设置当前(即将)访问的Stack页面
    function setCurrentStack(detail?: string) {
        currentStack.value = detail ?? config.app.TITLE
    }

    // 设置屏幕参数
    function setScreen(detail: { width: number, height: number }) {
        screen.value = detail
    }

    return {
        device, screen, currentStack,
        isWap,
        setDevice, setCurrentStack, setScreen,
    }
})