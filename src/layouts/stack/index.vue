<template>
    <div class="root">
        <el-page-header class="header" :icon="ArrowLeft" title="返回" @back="cc.navigateBack()">
            <template #content>
                <span class="title">{{ system.currentStack }}</span>
            </template>
        </el-page-header>
        <RouterView #default="{ Component, route }" class="body">
            <Transition enter-active-class="animate__animated animate__fadeInLeft">
                <!-- 添加key强制服用组件触发过渡效果 -->
                <component :is="Component" :key="route.path" />
            </Transition>
        </RouterView>
    </div>
</template>

<script lang="ts" setup>
import { useSystem } from '../../utils/stores/system'
import { cc } from '../../utils/tools'
import { ArrowLeft } from '@element-plus/icons-vue'

const system = useSystem()

</script>

<style lang="scss" scoped>
.root {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .header {
        flex-shrink: 0;
        box-sizing: border-box;
        padding: 1rem;
        background-color: $WHITE;
        color: $DARK_BLUE;
        border-bottom: .1rem $SMOKE_WHITE solid;

        .title {
            color: $DARK_BLUE
        }
    }

    .body {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

}
</style>