/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_BASE: string // api前缀
    readonly VITE_BASE: string // 根路径
    readonly VITE_DEV_PORT: string // 开发服务器的运行端口
    readonly VITE_INDEX_LOADING_TEXT: string // 主页加载时显示文本
    readonly VITE_DEFAULT_TITLE: string // 默认标题
    readonly VITE_APP_DESCRIPTION: string // APP描述
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}