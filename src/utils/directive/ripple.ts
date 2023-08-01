import { App } from 'vue'
import './ripple.scss'

export default {
    install(app: App) {
        const method = (el: HTMLElement) => {
            el.classList.add('active')
            setTimeout(() => el.classList.remove('active'), 200)
        }
        app.directive('ripple', {
            mounted(el: HTMLElement) {
                el.classList.add('v-ripple')
                el.addEventListener('click', () => method(el))
                el.addEventListener('mouseleave', () => el.classList.remove('active'))
            },
            unmounted(el: HTMLElement) {
                el.addEventListener('click', () => method(el))
                el.addEventListener('mouseleave', () => el.classList.remove('active'))
            }
        })
    }
}