<template>
    <wap v-if="system.isWap">
        <RouterView />
    </wap>
    <pc v-else>
        <RouterView />
    </pc>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSystem } from '../../utils/stores/system'
import { cc } from '../../utils/tools'
import pc from './pc.vue'
import wap from './wap.vue'
import { tabs } from '../../tab'
const router = useRouter()
const system = useSystem()

onMounted(() => {
    if (router.currentRoute.value.path === '/t/' || router.currentRoute.value.path === '/') {
        cc.switchTab(tabs[0].path)
    }
})
</script>

<style lang="scss" scoped>
</style>