<template>
  <div class="wap-root">
    <template v-if="config.app.WAP_MENU">
      <div class="flex-row wap-title-bar" :style="`--height: ${config.app.TABBAR_HEIGHT}rem;`">
        <!--          开启抽屉菜单-->
        <div class="title">{{ current }}</div>
        <div v-ripple class="menu-icon" @click="handler.onMenuIconClick">
          <more/>
        </div>
        <el-drawer
            v-model="drawer"
            direction="ltr" :with-header="false" size="75%"
            modal-class="wap-menu-modal">
          <div class="menu">
          <div class="menu-item">
            <div class="flex-row search-box">
              <el-input v-model="filter" placeholder="筛选主题" :prefix-icon="Search"/>
            </div>
            <div
                v-for="(item) in tabList" :key="item.path"
                v-ripple
                :style="`--color: ${getColor(item.label)}; --background: ${getBackground(item.label)};`"
                class="item"
                @click="handler.onTabClick(item)">
              <component :is="item.icon" :color="getColor(item.label)" class="widget"/>
              <span class="label">{{ item.label }}</span>
            </div>

          </div>
          <div class="header" v-ripple>
            <img :src="assets.scnuLogo" class="logo" alt="logo">
            <div class="title">{{ config.app.ABBR }} {{ config.app.VERSION }}</div>
          </div>
          </div>
        </el-drawer>
      </div>
      <div class="wap-body">
        <slot></slot>
      </div>
      <div class="menu-modal">

      </div>
    </template>
    <template v-else>
      <div class="wap-body">
        <slot></slot>
      </div>
      <div class="wap-tabbar" :style="`--height: ${config.app.TABBAR_HEIGHT}rem`">
        <div v-for="(item, index) in tabs" :key="index" class="item animate__animated"
             @click="handler.onTabClick(item.path)" :class="{ 'animate__pulse': item.label === current }">
          <component :is="item.icon" :color="getColor(item.label)" class="icon"/>
          <div class="label" :style="`--color: ${getColor(item.label)}`">
            {{ item.label }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRoute} from 'vue-router'
import {config} from '../../config'
import {tabs} from '../../tab'
import {cc} from '../../utils/tools'
import {More, Search} from '@element-plus/icons-vue'
import {assets} from "@/utils/assets.ts";

const primary = config.color.DARK_BLUE

const route = useRoute()

const current = computed(() => route.meta.label as string)
const getColor = (label: string) => current.value === label ? primary : config.color.DARK_GREY
const getBackground = (label: string) => current.value === label ? cc.colorUtils.lighten(primary, 0.58) : 'transparent'
// 显示drawer
const drawer = ref(false)
// 筛选框
const filter = ref('')

const tabList = computed(() => {
  if (!Boolean(filter.value)) {
    return tabs
  }
  return tabs.filter(item => item.label.includes(filter.value) || item.path.includes(filter.value))
})

const handler = {
  onTabClick(item: any) {
    if (item.label !== current.value) {
      cc.switchTab(item.path)
      drawer.value = false
    }
  },
  onMenuIconClick() {
    drawer.value = !drawer.value
  }
}

</script>

<style scoped lang="scss">
@import './assets/wap.scss';
</style>