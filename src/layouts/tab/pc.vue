<template>
  <div class="pc-root">
    <div class="menu" :style="`--width: ${config.app.MENU_WIDTH}rem;`">

      <div class="menu-item">
        <el-input v-model="filter" placeholder="筛选主题" :prefix-icon="Search" class="search-box"/>
        <div
            v-for="(item, index) in tabList" :key="index"
            :style="`--color: ${getColor(item.label)}; --background: ${getBackground(item.label)}; --hover: ${cc.colorUtils.lighten(primary, 0.6)};`"
            class="item"
            @click="handler.onTabClick(item.path)"
            v-ripple>
          <component :is="item.icon" :color="getColor(item.label)" class="widget"/>
          <span class="label">{{ item.label }}</span>
        </div>
      </div>
      <div class="header" v-ripple>
        <img :src="assets.scnuLogo" class="logo" alt="logo">
        <div class="title">{{config.app.ABBR}} {{ config.app.VERSION }}</div>
      </div>
    </div>
    <div class="body" :style="`--bg-dark: ${cc.colorUtils.lighten(primary, 0.58)}; --bg-light: ${cc.colorUtils.lighten(primary, 0.62)}`">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { config } from '@/config.ts'
import { tabs } from '@/tab.ts'
import { computed, ref } from 'vue'
import { cc } from '@/utils/tools.ts'
import { assets } from '@/utils/assets.ts'
import { Search } from '@element-plus/icons-vue'

const route = useRoute()

const primary = config.color.DARK_BLUE

const current = computed(() => route.meta.label as string)
const getColor = (label: string) => current.value === label ? primary : config.color.DARK_GREY
const getBackground = (label: string) => current.value === label ? cc.colorUtils.lighten(primary, 0.58) : 'transparent'

// 筛选框
const filter = ref('')

const tabList = computed(() => {
  if (!Boolean(filter.value)) {
    return tabs
  }
  return tabs.filter(item => item.label.includes(filter.value) || item.path.includes(filter.value))
})

const handler = {
  onTabClick(path: string) {
    cc.switchTab(path)
  }
}
</script>

<style scoped lang="scss">
@import './assets/pc.scss';
</style>