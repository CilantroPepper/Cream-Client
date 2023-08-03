<template>
  <div
      :style="`--color: ${textColor}; --background: ${backgroundColor}; --border: ${borderColor}; --padding: ${padding}; --shadow: ${shadow}`"
      :class="$style.root" v-ripple
      @click="handler.onClick">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { config } from '@/config.ts'
import { computed, ref } from 'vue'
import { cc } from '@/utils/tools.ts'

export interface CcButtonProps {
  size?: 'small' | 'medium' | 'large',
  variant?: 'outlined' | 'contained' | 'text',
  color?: string
  factor?: number
  mimetic?: boolean // 是否拟态
}

export interface CcButtonEmits {
  (name: 'click', e: MouseEvent): any
}

const props = defineProps<CcButtonProps>()
const emits = defineEmits<CcButtonEmits>()

const backgroundColor = computed(() => {
  if (props.variant === 'text') {
    return 'transparent'
  }
  if (props.variant === 'contained') {
    return props.color ?? config.color.DARK_BLUE
  }
  return cc.colorUtils.lighten(props.color ?? config.color.DARK_BLUE, props.factor ?? 0.56)
})
const borderColor = computed(() => {
  if (props.variant === 'text') {
    return 'transparent'
  }
  if (props.variant === 'contained') {
    return backgroundColor
  }
  return props.color ?? config.color.DARK_BLUE
})
const textColor = computed(() => {
  if ((props.variant ?? 'outlined') !== 'contained') {
    return props.color ?? config.color.DARK_BLUE
  }
  return cc.colorUtils.isDarkAbove(props.color ?? config.color.DARK_BLUE) ? '#000000' : '#ffffff'
})
const padding = computed(() => {
  if (props.size === 'large') {
    return `.75rem 1.25rem`
  }
  if (props.size === 'small') {
    return `.25rem .75rem`
  }
  return `.5rem 1rem`
})
const shadow = computed(() => {
  return props.variant === 'text' ? 'none' : '.8rem'
})

const handler = {
  onClick(e: MouseEvent) {
    e.stopPropagation()
    e.preventDefault()
    emits('click', e)
  }
}
</script>


<style module lang="scss">
.root {
  color: var(--color);
  background: var(--background);
  border: .1rem var(--border) solid;
  padding: var(--padding);
  box-shadow: 0 0 0 0 $LIGHT_GREY;
  border-radius: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  max-width: 100%;
  flex-shrink: 0;
  overflow-x: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  user-select: none;
  transition: all .25s;

  @media screen and (min-width: $PC_MIN_WIDTH) {
    cursor: pointer;
  }
}
.root:active {
  box-shadow: .1rem .1rem var(--shadow) .1rem #cccc;
}
</style>