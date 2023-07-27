<template>
  <div class="app-root" :style="`--width: ${system.screen.width}px; --height: ${system.screen.height}px;`">
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { useSystem } from './utils/stores/system'

const system = useSystem()
</script>

<style scoped lang="scss">
.app-root {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 1.6rem;
}
</style>
