<template>
  <wap v-if="system.isWap">
    <template #default>
      <router-view />
    </template>
    <template #util>
      <util-index/>
    </template>
  </wap>
  <pc v-else>
    <template #default>
      <router-view />
    </template>
    <template #util>
      <util-index/>
    </template>
  </pc>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSystem } from '@/utils/stores/system.ts'
import { cc } from '@/utils/tools.ts'
import pc from './pc.vue'
import wap from './wap.vue'
import { tabs } from '@/tab.ts'
import UtilIndex from '@/layouts/tab/utils/index.vue'

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