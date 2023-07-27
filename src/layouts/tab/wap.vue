<template>
    <div class="wap-root">
        <div class="wap-body">
            <slot></slot>
        </div>
        <div class="wap-tabbar" :style="`--height: ${config.app.TABBAR_HEIGHT}rem`">
            <div v-for="(item, index) in tabs" :key="index" class="item animate__animated"
                @click="handler.onTabClick(item.path)" :class="{ 'animate__pulse': item.label === current }">
                <component :is="item.icon" :color="getColor(item.label)" class="icon" />
                <div class="label" :style="`--color: ${getColor(item.label)}`">
                    {{ item.label }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { config } from '../../config'
import { tabs } from '../../tab'
import { cc } from '../../utils/tools'
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
@import './assets/wap.scss';
</style>