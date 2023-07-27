import { DefineComponent } from 'vue'
import { CirclePlusFilled, Histogram, UserFilled } from '@element-plus/icons-vue'

export interface TabConfig {
    // Menu/TabBar显示的Tab标签
    label: string
    // 匹配路由
    path: string
    // 匹配组件位置
    component: string
    // 图标
    icon: DefineComponent
}

/** 
 * Tab栏配置
 * @description Tab在WAP中表现为TabBar, 在PC中表现为Menu 
 * */
export const tabs: TabConfig[] = [{
    path: '/record',
    label: 'Record',
    icon: CirclePlusFilled as any,
    component: '/src/views/tab/record/index.vue'
}, {
    path: '/user',
    label: 'UserCenter',
    icon: UserFilled as any,
    component: '/src/views/tab/user/index.vue'
}]