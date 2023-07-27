import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { config } from '../config'
import { useStackInit } from './hooks/pages/useStackInit'
import { tabs } from '../tab'

const modules = import.meta.glob('@/views/**/index.vue')

/** 未经登录验证也可以访问的且不受TabBar路由和Stack路由控制的路由 */
export const whiteRoutes: RouteRecordRaw[] = [{
    path: '/login',
    component: () => import('../views/login/index.vue'),
    name: 'login'
}]

/** Tab路由 */
export function getTabRoutes(): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = tabs.map(({ path, component, label, icon }) => ({
        path: `/t${ path }`,
        component: modules[component],
        meta: { tab: true, label, icon }
    }))
    // 匹配主页和404
    routes.push({
        path: '/t/',
        redirect: { path: `/t${ tabs[0].path }` }
    }, {
        path: '/t/:pathMatch(.*)*',
        component: () => import('../layouts/not-found/index.vue')
    })
    return routes
}

/** Stack路由 */
export function getStackRoutes(): RouteRecordRaw[] {
    // 排除在views目录中但是已经作为Tab路由的组件
    const exclude = new Set<string>(tabs.map(({ component }) => component))
    const routes: RouteRecordRaw[] = []
    for (const path in modules) {
        if (!exclude.has(path)) {
            routes.push({
                // 将/src/views/**/index.vue的路径剪切成/s/**的形式
                path: `/s${ path.slice(10, -10) }`,
                component: modules[path],
                meta: { tab: false }
            })
        }
    }
    // 匹配404
    routes.push({
        path: '/s/',
        redirect: { name: 'tab' }
    }, {
        path: '/s/:pathMatch(.*)*',
        component: () => import('../layouts/not-found/index.vue')
    })
    return routes
}

/**
 * 全局路由
 */
export const router = createRouter({
    history: createWebHistory(config.app.BASE),
    routes: [
        ...whiteRoutes, {
            name: 'tab',
            path: '/t/',
            component: () => import('../layouts/tab/index.vue'),
            children: getTabRoutes()
        }, {
            name: 'stack',
            path: '/s/',
            component: () => import('../layouts/stack/index.vue'),
            children: getStackRoutes()
        }, {
            name: 'index',
            path: '/',
            redirect: { name: 'tab' }
        }, {
            name: 'notFound',
            path: '/:pathMatch(.*)*',
            component: () => import('../layouts/not-found/index.vue')
        }]
})

// 路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta.label) {
        document.title = to.meta.label as string
    } else {
        document.title = config.app.TITLE
    }
    next()
})
router.afterEach((to, from) => {
    // 清除上一个页面的title
    useStackInit()
})