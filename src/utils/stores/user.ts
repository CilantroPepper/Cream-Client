import { defineStore } from "pinia"
import { ref } from "vue"
import { storage } from '../storage'
import { config } from '../../config'

// 这只是一个示例interface，并不是实际的用户信息范式
export interface UserInfo {
    name: string
    account: string
}

export const useUser = defineStore('user', () => {
    // 全局用户信息
    const userInfo = ref<UserInfo | null>(null)
    // 全局TOKEN
    const token = ref<string | null>(null)


    /** actions */
    function setUserInfo(detail?: UserInfo | null) {
        userInfo.value = detail ?? null
        storage.set(config.storage.USER_INFO, userInfo.value)
    }
    function setToken(detail?: string | null) {
        token.value = detail ?? null
        storage.set(config.storage.TOKEN, token.value)
    }

    return { userInfo, setUserInfo, setToken }
})