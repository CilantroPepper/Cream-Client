import { ApiHook, AsyncFunction } from './type'
import { cc } from '../../tools'
import { ref } from 'vue'
import { CommonRequest } from '../../request'

export function useApi<T, K = CommonRequest>(api: AsyncFunction<T, K>): ApiHook<T, K>
export function useApi<T, K = CommonRequest>(api: AsyncFunction<T, K>, loading: boolean): ApiHook<T, K>
export function useApi<T, K = CommonRequest>(api: AsyncFunction<T, K>, loading?: boolean, loadingText?: string): ApiHook<T, K> {
    const data = ref<T>()
    const loadData = async (params?: K): Promise<T> => {
        const loader = loading === false ? null : cc.loading(loadingText ?? '')
        try {
            const result = await api(params)
            data.value = result
            return result
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            loader?.close()
        }
    }

    return [
        data,
        loadData
    ]
}