import 'animate.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.css'
import { init } from './utils/init'
import { router } from './utils/router'
import { errorHandler } from './utils/errorHandler'
import button from './utils/directive/button'

const app = createApp(App)
    .use(createPinia())
    .use(router)
    .use(button) // 安装自定义指令 v-btn，解决element-plus按钮点击不失焦的BUG

app.config.errorHandler = errorHandler

init()

app.mount('#app')

document.querySelector('.app-loading-root')?.remove()

