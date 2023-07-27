import { CommonRequest } from '../../utils/request'
import { cc } from '../../utils/tools'

export const fileApi = {
//     上传文件
    upload<T>(data?: CommonRequest) {
        const formData = new FormData()
        Object.entries(data ?? {}).forEach(([key, value]) => formData.append(key, value as any))
        return cc.upload<T>('/dev/file/upload', formData)
    }
}