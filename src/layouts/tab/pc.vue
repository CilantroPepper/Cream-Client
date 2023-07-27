<template>
  <div class="pc-root">
    <div class="menu" :style="`--width: ${config.app.MENU_WIDTH}rem;`">
      <div class="header">
        <img :src="assets.scnuLogo" alt="校徽" class="logo">
        <div class="title">{{ config.app.TITLE }}</div>
      </div>
      <div class="menu-item">
        <div
            v-for="(item, index) in tabs" :key="index"
            :style="`--color: ${getColor(item.label)}; --background: ${current === item.label ? 'var(--GLOBAL-LIGHTEST-BLUE)' : 'transparent'}`"
            class="item"
            @click="handler.onTabClick(item.path)">
          <component :is="item.icon" :color="getColor(item.label)" class="widget"/>
          <span class="label">{{ item.label }}</span>
        </div>
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
import { computed } from 'vue'
import { cc } from '../../utils/tools'
import { assets } from '../../utils/assets'

const route = useRoute()
const current = computed(() => route.meta.label as string)
const getColor = (label: string) => current.value === label ? config.color.DARK_BLUE : config.color.DARK_GREY

const handler = {
  onTabClick(path: string) {
    cc.switchTab(path)
  }
}
</script>

<style scoped lang="scss">
@import './assets/pc.scss';
</style>