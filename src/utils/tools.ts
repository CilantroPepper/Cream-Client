import { router, whiteRoutes } from './router'
import { request, RequestOptions } from './request'
import { smCrypto } from './smCrypto'
import { useSystem } from './stores/system'

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
     * @param multiply 是否接受多选
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
    /** 登录时会用的SM加密 */
    sm2Encrypt(value: string) {
        return smCrypto.doSm2Encrypt(value)
    },
    /** 尝试安装PWA */
    installPWA() {
        const system = useSystem()
        if (!system.supportPWA || !(<any>system.pwaEvent).prompt) {
            throw new Error('Not Support PWA')
        }
        (<any>system.pwaEvent).prompt()
    }
}