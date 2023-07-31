<template>
  <div class="root">
    <div class="carousel">
      <el-carousel indicator-position="outside" height="15rem">
        <el-carousel-item v-for="(item, index) in carousel" :key="index" class="item">
          <img :src="item.img" :alt="item.info" class="image" @click="handler.onClickCarousel(index)">
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-button type="primary" style="font-size: 1.6rem;" v-btn>主题按钮</el-button>
    <div>
      <el-alert type="warning" show-icon :closable="false">
        <template #title>
          <div class="global">连续两个el按钮使用时，若希望消除margin，则必须在中间插入一个无意义的template</div>
        </template>
      </el-alert>
    </div>
    <el-button type="primary" plain v-btn>主题按钮描边风格</el-button>
    <template></template>
    <el-button type="danger" plain v-btn>标识危险的按钮</el-button>
    <el-radio-group class="radio-group" v-model="radio">
      <el-radio label="1" size="large" class="flex-row">Option 1</el-radio>
      <el-radio label="2" size="large" class="flex-row">Option 2</el-radio>
    </el-radio-group>
    <div>
      <el-alert type="warning" show-icon :closable="false">
        <template #title>
          <div class="global">按钮不使用v-btn的话会导致不自动失焦(Element-Plus的缺陷)</div>
        </template>
      </el-alert>
    </div>

    <el-button @click="handler.showDialog">弹出对话框</el-button>
    <template></template>
    <el-button @click="handler.message" v-btn>弹出消息框</el-button>
    <template></template>
    <el-button @click="handler.notify" v-btn>弹出通知框</el-button>
    <div class="alert">
      <el-alert type="error" show-icon :closable="false">
        <template #title>
          <div class="global">
            100%宽度静态警示
          </div>
        </template>
      </el-alert>
    </div>
    <el-button @click="handler.loading" v-btn>打开加载, 1s后关闭</el-button>
    <template></template>
    <el-button type="primary" plain @click="handler.toNotFound" v-btn>跳转到另一个页面</el-button>
    <template />
    <el-button @click="handler.chooseFile" v-btn>选择图像上传</el-button>
    <template />
    <el-button @click="handler.showDrawer" v-btn>打开抽屉</el-button>
    <el-drawer v-model="showDrawer" :size="drawerSize" direction="ltr">
      <template #header>
        <div>一个抽屉</div>
      </template>
      <div>
        <el-alert title="移动端请不使用抽屉或使用如该页面的方法一样响应式地设置抽屉宽度" show-icon :closable="false" type="warning" />
        <el-button v-btn @click="cc.previewImage({ url: assets.scnuLogo })">预览图像</el-button>
      </div>
    </el-drawer>
    <el-button @click="handler.installPWA" v-btn>安装PWA</el-button>
    <template />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useStackInit } from '../../utils/hooks/pages/useStackInit'
import { cc } from '../../utils/tools'
import { useSystem } from '../../utils/stores/system'
import { assets } from '../../utils/assets'
import { useApi } from '../../utils/hooks/apis/useApi'
import { fileApi } from '../../apis/dev/fileApi'
import { UploadParams, UploadResult } from '../../utils/hooks/apis/dev/file.type'

// 如果希望自定义Stack页面的header，则你应该在该页面中使用这个hook，并传入title
useStackInit('Components Guide')

const system = useSystem()

const radio = ref('1')
const showDrawer = ref(false)

const carousel = [{
  img: assets.scnuLogo,
  info: '华师校徽'
}, {
  img: assets.internalError,
  info: 'Internal Error'
}]

const drawerSize = computed(() => system.isWap ? '100%' : '30%')

const handler = {
  showDialog() {
    cc.modal('一个弹框')
      .then(() => cc.message('点击了确认', 'success'))
      .catch(() => cc.message('点击了取消', 'warning'))
  },
  message() {
    cc.message('消息框', 'success')
  },
  notify() {
    cc.notify('右侧信息', 'warning')
  },
  loading() {
    const loader = cc.loading('正在努力加载...')
    setTimeout(() => loader.close(), 1000)
  },
  toNotFound() {
    cc.navigateTo('/this-is-a-useless-page')
  },
  chooseFile() {
    cc.chooseFile(['.png', '.jpg'], false)
      .then(async files => {
        console.log(files)
        cc.notify(`已选择${files.length}个文件，请打开控制台查看详情`, 'success')
        const [id, setId] = useApi<UploadResult, UploadParams>(fileApi.upload)
        await setId({
          file: files[0]
        })
        cc.message('上传成功', 'success')
        console.log('文件ID', id.value)
      })
      .catch(e => console.log(e))
  },
  showDrawer() {
    showDrawer.value = true
  },
  onClickCarousel(index: number) {
    cc.message(`点击了${carousel[index].info}`, 'info')
  },
  installPWA() {
    try {
      cc.installPWA()
    } catch (error) {
      cc.notify('当前环境暂不支持PWA应用', 'warning')
    }
  }
}
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  position: relative;

  .carousel {
    width: 100%;
    height: 15rem;
    margin-bottom: 2rem;
    position: relative;

    .item {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .image {
        height: 100%;
        width: auto;
        object-fit: contain;
        object-position: center;
      }
    }

  }

  .alert {
    display: flex;
    width: 100%;
  }

  .radio-group {
    width: 100%;
    flex-direction: row;
  }
}
</style>