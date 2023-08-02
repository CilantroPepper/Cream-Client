<template>
  <div class="pc-root">
    <div class="menu" :style="`--width: ${config.app.MENU_WIDTH}rem;`">

      <div class="menu-item">
        <el-input v-model="filter" placeholder="筛选主题" :prefix-icon="Search" class="search-box"/>
        <div
            v-for="(item, index) in tabList" :key="index"
            :style="`--color: ${getColor(item.label)}; --mimetic: ${mimetic(item.label)};`"
            class="item"
            @click="handler.onTabClick(item.path)"
            v-ripple>
          <component :is="item.icon" :color="getColor(item.label)" class="widget"/>
          <span class="label">{{ item.label }}</span>
        </div>
      </div>
      <div class="header" v-ripple>
        <img :src="assets.scnuLogo" class="logo" alt="logo">
        <div class="title">Design by {{ config.app.AUTHOR }}</div>
      </div>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { config } from '../../config'
import { tabs } from '../../tab'
import { computed, ref } from 'vue'
import { cc } from '../../utils/tools'
import { assets } from '../../utils/assets'
import { Search } from '@element-plus/icons-vue'

const route = useRoute()
const current = computed(() => route.meta.label as string)
const getColor = (label: string) => current.value === label ? config.color.DARK_BLUE : config.color.DARK_GREY

const mimetic = (label: string) =>
    current.value === label ?  `inset .2rem .2rem .4rem var(--GLOBAL-LIGHT-GREY), inset -.2rem -.2rem .4rem var(--GLOBAL-SMOKE-WHITE)`
        : `.2rem .2rem .4rem var(--GLOBAL-LIGHT-GREY), -.2rem -.2rem .4rem var(--GLOBAL-SMOKE-WHITE)`

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