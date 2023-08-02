import { h, render } from 'vue'
import ImagePreview, { ImagePreviewProps } from '../components/ImagePreview/ImagePreview.vue'
import { layer } from '../config'
import { RequestOptions, request } from './request'
import { router, whiteRoutes } from './router'
import { smCrypto } from './smCrypto'
import { useSystem } from './stores/system'
import CryptoJS from 'crypto-js'
import JSEncrypt from 'jsencrypt'

/**
 * 各种工具
 * @description 包含路由切换、Toast、加载等等的工具方法
 */
export const cc = {
    // 仅用于切换到某Tab页
    switchTab(path: string, query?: Record<string, any>) {
        router.replace({
            path: `/t${ path }`,
            query
        })
    },
    // 导航到某非Tab页，也支持跳转到白名单路由有的路径
    navigateTo(path: string, query?: Record<string, any>) {
        let target: string = path
        if (!whiteRoutes.find(item => item.path === path)) {
            target = `/s${ path }`
        }
        router.push({
            path: target,
            query
        })
    },
    // 回到上一页
    navigateBack() {
        router.back()
    },
    // 显示对话框
    modal(message: string, title?: string, cancelable = true) {
        return ElMessageBox({
            message,
            title: title ?? '提示',
            showCancelButton: cancelable,
            cancelButtonText: '取消',
            confirmButtonText: '确定'
        })
    },
    // 提示
    message(message: string, type?: 'info' | 'error' | 'success' | 'warning') {
        return ElMessage({
            message,
            type,
            showClose: true
        })
    },
    // 右侧提示
    notify(message: string, type?: 'info' | 'error' | 'success' | 'warning', title?: string, duration = 2000) {
        return ElNotification({
            title: title ?? '提示',
            message,
            duration,
            type
        })
    },
    /**
     * 加载
     * @return 返回加载组件实例，调用其 `close()` 方法可以关闭加载
     */
    loading(text?: string, background?: string) {
        return ElLoading.service({
            text,
            background: background ?? `rgba(255, 255, 255, 0)`
        })
    },
    /**
     * 选择本地文件
     * @param accept 接受的文件后缀
     * @param multiple 是否接受多选
     * @description 请在then中获取选择的文件列表并进行业务操作，catch块不应作为没有选择的依据
     */
    chooseFile: (accept?: string[], multiple = false) => new Promise<FileList>((resolve, reject) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = (accept ?? []).join(',')
        input.multiple = multiple
        input.onchange = _ => {
            if (!input.files) return reject('No File Select')
            return resolve(input.files)
        }
        input.click()
    }),
    /**
     * 网络请求，请求接口
     * @description 基于request.ts的再次封装，可以简化调用时的代码
     */
    request<T>(url: string, data: any = null, method: 'GET' | 'POST' = 'GET', responseType?: 'blob') {
        return request<T>({
            url, data, method, responseType
        })
    },
    /** 文件上传 */
    upload<T>(url: string, data: FormData) {
        return request<T>({
            url,
            data,
            method: 'POST',
            json: false
        } as RequestOptions)
    },
    /** 由Fetch请求预览文件 */
    async previewFile(response: Response) {
        const data = await response.blob()
        const link = document.createElement('a')
        const url = URL.createObjectURL(data)
        const file_name = decodeURIComponent(response.headers.get('content-disposition')?.split?.('=')?.[1] ?? '')
        link.href = url
        link.download = file_name
        link.click()
        URL.revokeObjectURL(url)
    },
    // SM加密
    sm2Encrypt(value: string) {
        return smCrypto.doSm2Encrypt(value)
    },
    // AES 加密
    aesEncrypt(data: string) {
        const secret = this.getRandomKey(16)
        return {
            secret,
            result: CryptoJS.AES.encrypt(data, secret).toString()
        }
    },
    // RSA 加密
    rsaEncrypt(data: string, publicKey?: string) {
        const key = publicKey ?? `-----BEGIN PUBLIC KEY-----
        MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMLNzp815xggKCk+nWl77qbPDbJpQO5B
        mG6pz8e9H0DIgpvoqpWqMpG1brH33CqM+yKqLay1ToBLr7QIumlbATkCAwEAAQ==
        -----END PUBLIC KEY-----`
        const encrypter = new JSEncrypt()
        encrypter.setPublicKey(key)
        const result = encrypter.encrypt(data)
        if (!result) throw new Error('RSA Encrypt Fail!')
        return result
    },
    /** 尝试安装PWA */
    installPWA() {
        const system = useSystem()
        if (!system.supportPWA || !(<any>system.pwaEvent).prompt) {
            throw new Error('Not Support PWA')
        }
        (<any>system.pwaEvent).prompt()
    },
    // 预览图像
    previewImage(props: ImagePreviewProps) {
        const container = document.createElement('div')
        container.setAttribute('style', `position: fixed; width: 100vw; height: 100vh; z-index: ${ layer.preview }; top: 0; left: 0;`)
        document.body.appendChild(container)
        const close = () => {
            setTimeout(() => {
                render(null, container)
                document.body.removeChild(container)
            }, 250)

        }
        render(h(ImagePreview, {
            ...props,
            onClose: close
        }), container)
    },
    // 随机生成字符串
    getRandomKey(size: number, source?: string) {
        const dict = source ?? 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789'
        let uuid = ''
        for (let i = 0; i < length; ++i)
            uuid += dict[Math.floor(Math.random() * dict.length)]
        return uuid
    },
    // 颜色工具
    colorUtils: {
        // 十六进制颜色转RGB
        hexToRgb(hex: string): [number, number, number] {
            if (hex.length !== 7) throw new Error('请传入#开头的六位十六进制颜色')
            const r = parseInt(hex.slice(1, 3), 16)
            const g = parseInt(hex.slice(3, 5), 16)
            const b = parseInt(hex.slice(5, 7), 16)
            return [r, g, b]
        },
        // 将十进制数转化为两位十六进制数
        componentToHex(decimal: number): string {
            const hex = Number(decimal.toFixed(0)).toString(16)
            return hex.length === 1 ? '0' + hex : hex
        },
        // RGB(A)转化为Hex
        rgbToHex(...rgb: number[]): string {
            return rgb.reduce((prev, cur) => (prev + this.componentToHex(cur)), '#')
        },
        /**
         * 改变颜色亮度
         * @param color `#`开头的6位十六进制颜色
         * @param factor `[0, +∞)`的数，表示亮度
         */
        brighten(color: string, factor: number) {
            const rgb = this.hexToRgb(color)
            return this.rgbToHex(...rgb.map(value => Math.min(255, value * factor)))
        },
        /**
         * 获取颜色亮度
         */
        getBrightness([r, g, b]: [number, number, number]) {
            return (r * 299 + g * 587 + b * 114) / 1000
        },
        /**
         * 获取在其背景下是否应该是暗色字体
         * @param color #开头的6位十六进制颜色
         * @param threshold 阈值，[0, 255]
         */
        isDarkAbove(color: string, threshold: number = 128) {
            const rgb = this.hexToRgb(color)
            const brightness = this.getBrightness(rgb)
            return brightness > threshold
        },
        /**
         * 获取十六进制颜色HSL
         * @param color #开头的6位十六进制颜色
         */
        hexToHsl(color: string): [number, number, number] {
            let [r, g, b] = this.hexToRgb(color)
            r /= 255
            g /= 255
            b /= 255
            const min = Math.min(r, g, b)
            const max = Math.max(r, g, b)
            let h = 0, s = 0, l = (max + min) / 2
            if (min !== max) {
                const d = max - min
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0)
                        break
                    case g:
                        h = (b - r) / d + 2
                        break
                    case b:
                        h = (r - g) / d + 4
                        break
                }
                h /= 6
            }
            return [h, s, l]
        },
        /**
         * HSL转化为RGB
         */
        hslToRgb([h, s, l]: [number, number, number]): [number, number, number] {
            let r: number, g: number, b: number
            r = g = b = l
            const hue2rgb = (p: number, q: number, t: number): number => {
                if (t < 0) t += 1
                if (t > 1) t -= 1
                if (t < 1 / 6) return p + (q - p) * 6 * t
                if (t < 1 / 2) return q
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
                return p
            }
            if (s !== 0) {
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s
                const p = 2 * l - q
                r = hue2rgb(p, q, h + 1 / 3)
                g = hue2rgb(p, q, h)
                b = hue2rgb(p, q, h - 1 / 3)
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
        },
        /**
         * 让某个颜色变浅
         * @param color #开头的6位十六进制颜色
         * @param amount 程度
         */
        lighten(color: string, amount: number) {
            const [h, s, l] = this.hexToHsl(color)
            // Increase the lightness (l) component by the specified amount
            const newL = Math.min(1, Math.max(0, l + amount))
            // Convert the new HSL color back to RGB
            return this.rgbToHex(...this.hslToRgb([h, s, newL]))
        }
    }
}