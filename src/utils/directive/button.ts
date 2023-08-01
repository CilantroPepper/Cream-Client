import { App } from 'vue'

export default {
    install(app: App) {
        const method = (e: Event) => {
            if (!e.target) return
            const target: HTMLButtonElement = (<any>e.target).nodeName === 'SPAN' ? (<any>e.target).parentNode : <any>e.target
            setTimeout(() => target.blur(), 200)
        }

        app.directive('btn', {
            mounted(el: HTMLElement) {
                el.addEventListener('focus', method)
            },
            unmounted(el: HTMLElement) {
                el.removeEventListener('focus', method)
            }
        })
    }
}