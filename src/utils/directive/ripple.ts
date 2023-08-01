import { App } from 'vue'
import './ripple.scss'

export default {
    install(app: App) {
        app.directive('ripple', {
            mounted(el: HTMLElement) {
                el.classList.add('v-ripple')
            }
        })
    }
}