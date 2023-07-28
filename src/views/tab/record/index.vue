<template>
    <div>
        这是受到Tab路由控制的Record页面
    </div>
    <div>
        <el-button type="primary" plain v-btn @click="handler.toGuide">前往Guide</el-button>
    </div>
</template>

<script lang="ts" setup>
import { cc } from '../../../utils/tools';
const handler = {
    toGuide() {
        cc.navigateTo('/guide')
    }
}
</script>

<style lang="scss" scoped>
</style>