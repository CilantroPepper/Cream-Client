import { App } from 'vue'
import './ripple.scss'

export default {
    install(app: App) {
        const cancel = (el: HTMLElement) => {
            el.style.removeProperty('--left')
            el.style.removeProperty('--top')
            el.classList.remove('active')
        }
        const trigger = (e: MouseEvent, el: HTMLElement) => {
            el.style.setProperty('--left', e.offsetX + 'px')
            el.style.setProperty('--top', e.offsetY + 'px')
            el.classList.add('active')
            setTimeout(() => cancel(el), 250)
        }
        app.directive('ripple', {
            mounted(el: HTMLElement) {
                el.classList.add('v-ripple')
                el.addEventListener('click', (e) => trigger(e, el))
            },
            unmounted(el: HTMLElement) {
                el.removeEventListener('click', (e) => trigger(e, el))
            }
        })
    }
}