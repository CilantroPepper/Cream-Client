import 'animate.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.css'
import init from './utils/init'
import { router } from './utils/router'
import { errorHandler } from './utils/errorHandler'

const app = createApp(App)
    .use(createPinia())
    .use(router)
    .use(init)

app.config.errorHandler = errorHandler

app.mount('#app')
