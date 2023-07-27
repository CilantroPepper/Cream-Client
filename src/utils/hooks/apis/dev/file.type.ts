import { CommonRequest } from '../../../request'

// 上传文件
export interface UploadParams extends CommonRequest {
    file: File
}

// 上传文件返回文件ID
export type UploadResult = string