export const storage = {
    // 获取原始缓存
    getOrigin(key: string) {
        return localStorage.getItem(key)
    },
    // 设置缓存，如果传入是一个可序列化的对象则转化为JSON存储
    set<T extends object | string>(key: string, value: T | null) {
        if (value === null) {
            return storage.clear()
        }
        let data: T | string
        try {
            data = JSON.stringify(value)
        } catch (e) {
            throw new Error('Data Not Support')
        }
        localStorage.setItem(key, data)
    },
    // 取出缓存并且进行JSON解析
    get<T>(key: string) {
        const data = storage.getOrigin(key)
        if (!data) return null
        try {
            return <T>JSON.parse(data)
        } catch (e) {
            throw new Error('Data Not Support')
        }
    },
    // 删除某个缓存属性
    remove(key: string) {
        localStorage.removeItem(key)
    },
    // 清空缓存
    clear() {
        localStorage.clear()
    }
}