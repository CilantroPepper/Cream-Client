import { ComponentPublicInstance } from 'vue'
import { cc } from './tools'

export const errorHandler =  (err: unknown, instance: (ComponentPublicInstance | null), info: string) => {
    cc.notify('运行时出现错误', 'error')
    console.error(err)
    console.log('组件异常', instance, info)
}