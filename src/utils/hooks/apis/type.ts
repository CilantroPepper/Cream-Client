import { Ref } from 'vue'

export type AsyncFunction<T, K> = (p?: K) => Promise<T>
export type ApiHook<T, K> = [Ref<T | undefined>, AsyncFunction<T, K>]