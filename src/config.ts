/**
 * 全局配置文件
 */
export const config = {
    // 应用配置
    app: {
        // 根路径
        BASE: import.meta.env.VITE_BASE,
        // API前缀
        API_BASE: import.meta.env.VITE_API_BASE,
        // 默认标签栏标题
        TITLE: import.meta.env.VITE_DEFAULT_TITLE as string,
        // TOKEN 名
        TOKEN_NAME: 'token',
        // PC基准宽度（用于设置响应式单位）, 小于这个宽度的就会被当作WAP端渲染
        STANDARD_WIDTH: 800,
        // WAP端TabBar高度(单位: rem)
        TABBAR_HEIGHT: 4.8,
        // WAP端是否开启抽屉菜单（若为true，则TabBar表现为抽屉菜单，Tab页有标题栏）
        WAP_MENU: true,
        // PC端Menu宽度(单位: rem)
        MENU_WIDTH: 24,
        // 描述
        DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION,
        // 作者
        AUTHOR: import.meta.env.VITE_APP_AUTHOR,
        // 版本
        VERSION: import.meta.env.VITE_APP_VERSION,
        // 缩写
        ABBR: import.meta.env.VITE_APP_ABBR
    },
    // 颜色配置
    color: {
        WHITE: '#ffffff',
        BLACK: '#000000',
        DARK_GREY: '#888888',
        LIGHT_GREY: '#d8d8d8',
        SMOKE_WHITE: '#f6f6f6',
        BLUE: '#3284c9',
        DARK_BLUE: '#2f5597',
        LIGHT_BLUE: '#9fcbef',
        LIGHTEST_BLUE: '#eaf3ff',
        RED: '#F56C6C',
        ORANGE: '#dd6600',
        GREEN: '#67C23A',
        NIGHT: '#010320'
    },
    // 缓存配置
    storage: {
        // Token 缓存名
        TOKEN: 'TOKEN',
        // 用户信息缓存名
        USER_INFO: 'USER_INFO',
    }
}

// zIndex配置
export const layer = {
    normal: 0,
    drawer: 2003,
    drawerBackdrop: 2006,
    loading: 2004,
    modal: 2004,
    message: 2004,
    notify: 2006,
    preview: 2023
}