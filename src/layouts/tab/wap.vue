<template>
  <div class="wap-root">
    <template v-if="config.app.WAP_MENU">
      <div class="flex-row wap-title-bar" :style="`--height: ${config.app.TABBAR_HEIGHT}rem;`">
        <!--          开启抽屉菜单-->
        <div class="title">{{ current }}</div>
        <more class="menu-icon" :class="{active: menuIconActivated}" @click="handler.onMenuIconClick"/>
        <el-drawer
            v-model="drawer"
            direction="ltr" :with-header="false" size="75%"
            modal-class="wap-menu-modal">
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
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { config } from '../../config'
import { tabs } from '../../tab'
import { cc } from '../../utils/tools'
import { More } from '@element-plus/icons-vue'

const route = useRoute()

const current = computed(() => route.meta.label as string)
const getColor = (label: string) => current.value === label ? config.color.DARK_BLUE : config.color.DARK_GREY

// 是否激活icon
const menuIconActivated = ref(false)
// 显示drawer
const drawer = ref(false)

const handler = {
  onTabClick(path: string) {
    cc.switchTab(path)
    drawer.value = false
  },
  onMenuIconClick() {
    menuIconActivated.value = true
    drawer.value = !drawer.value
    setTimeout(() => (menuIconActivated.value = false), 250)
  }
}

</script>

<style scoped lang="scss">
@import './assets/wap.scss';
</style>