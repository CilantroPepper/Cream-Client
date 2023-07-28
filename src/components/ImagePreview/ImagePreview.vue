<template>
    <Transition enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut">
        <div v-if="open" :class="$style.root" @click="handler.onClickBackdrop" @scroll="handler.onScroll"
            :style="`--backdrop: ${backdropColor ?? '#0008'};`">
            <img :class="$style.image" @click="handler.onClickImage" :src="url" :style="`--width: ${size.width}; --height: ${size.height}`" />
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import { useSystem } from '../../utils/stores/system'
import { ref, computed } from 'vue'

export interface ImagePreviewProps {
    url: string
    backdropColor?: string
}
export interface ImagePreviewEmits {
    (e: 'close'): any
}
defineProps<ImagePreviewProps>()
const emit = defineEmits<ImagePreviewEmits>()

const store = {
    system: useSystem()
}

const size = computed(() => {
    const screen = store.system.screen
    const isWap = store.system.isWap
    return {
        width: screen.width > screen.height ? 'auto' : isWap ? '90%' : '60%',
        height: screen.width < screen.height ? 'auto' : isWap ? '90%' : '60%'
    }
})

const open = ref(false)
const handler = {
    onClickImage(e: Event) {
        e.preventDefault()
        e.stopPropagation()
    },
    onClickBackdrop() {
        open.value = false
        emit('close')
    },
    onScroll(e: Event) {
        e.stopPropagation()
    }
}
setTimeout(() => {
    open.value = true
})
</script>

<style module lang="scss">
.root {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--backdrop);

    .image {
        width: var(--width);
        height: var(--height);
        object-fit: contain;
        object-position: center;
    }
}
</style>