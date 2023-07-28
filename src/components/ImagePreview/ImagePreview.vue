<template>
    <Transition enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut">
        <div v-if="open" :class="$style.root" @click="handler.onClickBackdrop" @scroll="handler.onScroll"
            :style="`--backdrop: ${backdropColor ?? '#0008'};`"
            @wheel="handler.onWheel" 
            @touchmove="handler.onTouchMove"
            @touchstart="handler.onTouchStart"
            @touchend="handler.onTouchEnd"
            @dragover="handler.prevent"
            @dragenter="handler.prevent"
            @dragstart="handler.prevent">
            <img 
                :class="$style.image" @click="handler.onClickImage" :src="url"
                :style="`--width: ${size.width}; --height: ${size.height}; --scale: ${scale}; --translate-x: ${translate.x}px; --translate-y: ${translate.y}px`"
                @mousedown="handler.onMouseDown" @mousemove="handler.onMouseMove" @mouseleave="handler.onMouseLeave" @mouseup="handler.onMouseUp"/>
            <div :class="$style.close" @click="handler.onClickClose">&times;</div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
import { useSystem } from '../../utils/stores/system'
import { ref, computed } from 'vue'

export interface ImagePreviewProps {
    url: string
    backdropColor?: string
    maxScale?: number
    minScale?: number
    scaleUnit?: number
}
export interface ImagePreviewEmits {
    (e: 'close'): any
}
const props = defineProps<ImagePreviewProps>()
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
const scale = ref(1)
const translate = ref({
    x: 0, y: 0
})
// 上一个移动状态
let initialMoveStatus: null | Record<'x' | 'y', number> = null
// 移动端: 上一组touch数据
let initialTouchStatus: null | number

const open = ref(false)

const tool = {
    getDistance(...pos: number[]) {
        const dim = pos.length / 2
        let res = 0
        if (dim !== Math.floor(dim)) throw new Error('必须是整数个坐标')
        for (let i = 0; i < dim; ++i) {
            res += Math.pow(pos[i] - pos[i + dim], 2)
        }
        return Number((Math.sqrt(res)).toFixed(2))
    }
}

const handler = {
    prevent(e: Event) {
        e.preventDefault()
        e.stopPropagation()
    },
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
    },
    onClickClose(e: Event) {
        e.preventDefault()
        e.stopPropagation()
        handler.onClickBackdrop()
    },
    onWheel(e: WheelEvent) {
        const unit = props.scaleUnit ?? 0.2
        if (e.deltaY < 0 && scale.value < (props.maxScale ?? 4)) scale.value += unit
        if (e.deltaY > 0 && scale.value > (props.minScale ?? 0.5)) scale.value -= unit
    },
    onTouchMove(e: TouchEvent) {
        const touches = e.targetTouches
        if (touches.length !== 2) return
        if (initialTouchStatus === null) return
        const distance = tool.getDistance(touches[0].screenX, touches[0].screenY, touches[1].screenX, touches[1].screenY)
        scale.value = distance / initialTouchStatus
    },
    onTouchStart(e: TouchEvent) {
        const touches = e.targetTouches
        if (touches.length !== 2) {
            return
        }
        initialTouchStatus = tool.getDistance(touches[0].screenX, touches[0].screenY, touches[1].screenX, touches[1].screenY)
    },
    onTouchEnd() {
        initialTouchStatus = null
    },
    onMouseDown(e: MouseEvent) {
        initialMoveStatus = {
            x: e.clientX,
            y: e.clientY
        }
    },
    onMouseLeave() {
        initialMoveStatus = null
    },
    onMouseUp() {
        handler.onMouseLeave()
    },
    onMouseMove(e: MouseEvent) {
        if (!initialMoveStatus) return
        translate.value.x += Number(((e.clientX - initialMoveStatus.x) / scale.value).toFixed(2))
        translate.value.y += Number(((e.clientY - initialMoveStatus.y) / scale.value).toFixed(2))
        initialMoveStatus.x = e.clientX
        initialMoveStatus.y = e.clientY
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

    .close {
        position: absolute;
        bottom: 10%;
        color: $SMOKE_WHITE;
        width: 4.5rem;
        height: 4.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #0005;
        border-radius: 50%;
        font-size: 2rem;
        z-index: 2;

        @media (hover: hover) {
            cursor: pointer;
        }
    }

    .image {
        width: var(--width);
        height: var(--height);
        object-fit: contain;
        object-position: center;
        transform: scale3d(var(--scale), var(--scale), 1) translate3d(var(--translate-x), var(--translate-y), 0);
        user-select: none;
        cursor: auto;
    }
}
</style>