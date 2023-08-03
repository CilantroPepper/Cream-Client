<template>
  <div class="flex-col" :class="$style.root" v-ripple
       :style="`--primary: ${primary}; --light: ${styles.light.value}; --lightest: ${styles.lightest.value};`">
    <div class="flex-row" :class="$style.info">
      <img :src="assets.scnuBanner" alt="avatar" :class="$style.avatar">
      <div :class="$style.desc" class="flex-col">
        <div :class="$style.title">{{ config.app.AUTHOR }}</div>
        <div :class="$style.subtitle">{{ config.app.TITLE }}</div>
      </div>
    </div>
    <div class="flex-row" :class="$style.action">
      <cc-button size="small" :class="$style.button" :color="config.color.RED" :factor="0.28">退出登录</cc-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { assets } from "@/utils/assets.ts";
import CcButton from "@/components/Button/CcButton.vue";
import { config } from "@/config.ts";
import { computed } from "vue";
import { cc } from "@/utils/tools.ts";

const primary = config.color.DARK_BLUE
const styles = {
  light: computed(() => cc.colorUtils.lighten(primary, 0.57)),
  lightest: computed(() => cc.colorUtils.lighten(primary, 0.6)),
}
</script>

<style lang="scss" module>
.root {
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: .75rem;
  //box-shadow: 0 0 1rem var(--light), 0 0 2.5rem var(--lightest);
  background: linear-gradient(60deg, var(--light), var(--lightest));

  @media screen and (min-width: $PC_MIN_WIDTH) {
    cursor: pointer;
  }
}

.info {
  align-items: center;
  width: 100%;
  gap: 1rem;

  .avatar {
    object-fit: scale-down;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    box-shadow: inset .2rem .2rem .4rem #ccc8, inset -.2rem -.2rem .4rem #fff8;
    box-sizing: border-box;
  }

  .desc {
    flex: 1 0;
    gap: .1rem;
    width: 100%;
    overflow: hidden;

    .title {
      font-size: 1.4rem;
      color: $DARK_BLUE;
    }

    .subtitle {
      color: $DARK_GREY;
      font-size: 1rem;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.action {
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  .button {
    font-size: 1.2rem;
  }
}
</style>