import { config } from '../config'
import { storage } from './storage'
import { cc } from './tools'

// 以下这些code需要重新登录
const reloadCodes = [401, 1011007, 1011008]
const errorCodeMap = {
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
    513: '文件过大',
    40001: '用户初始信息未填写'
}

// 请求配置
export interface RequestOptions {
    url: string
    data?: any
    method?: 'GET' | 'POST'
    // 自定义请求头
    headers?: HeadersInit
    // 返回类型
    responseType?: 'blob'
    // 是否JSON转换 默认true
    json?: boolean
}

interface ResponseType {
    code: number
    data: any | null
    msg: string
}

export const urlPrefix = config.app.API_BASE

/**
 * 基本请求模块
 * @param options 请求配置
 */
export async function request<T>(options: RequestOptions): Promise<T> {
    let { url, data, method, json } = options
    if (!method) method = 'POST'
    if (json === void 0) json = true
    url = urlPrefix + url
    if (method === 'GET' && data) {
        url += `?${new URLSearchParams(data).toString()}`
        data = null
    }
    if (json && data) {
        data = JSON.stringify(data)
        options.headers = {
            'content-type': 'application/json; charset=utf8',
            'content-length': data.length
        }
    }
    const headers = new Headers(options.headers)
    // 获取本地token
    const token = storage.get<string>(config.storage.TOKEN)
    if (token) headers.set(config.app.TOKEN_NAME, token)
    let response: Response
    try {
        response = await fetch(url, {
            method,
            body: data,
            headers
        })
    } catch (e) {
        cc.notify('请求出错或服务器过载', 'error')
        throw e
    }
    if (!response.ok) {
        throw response
    }
    // 配置了返回是文件，直接返回原始 response
    if (options.responseType === 'blob') return await response as T
    const resData = await response.json() as ResponseType
    if (reloadCodes.includes(resData.code)) {
        // 需要重新登陆
        // 清除用户信息缓存和TOKEN缓存
        storage.remove(config.storage.USER_INFO)
        storage.remove(config.storage.TOKEN)
        cc.modal('用户未登录，请登录以使用系统完整功能。', '提示', false)
            .finally(() => {
                cc.navigateTo('/login')
            })
        throw response
    }
    if (resData.code !== 200) {
        cc.notify(resData.msg, 'error')
        throw resData
    }
    return resData.data as T
}

export interface CommonRequest {
    [k: string]: string | number | undefined | File
}