<template>
  <div class="common-layout">
    <el-container>
      <el-header height="50px" class="header">
        <div class="header left">
          <el-icon @click="router.go(-1)" class="icon-arrow">
            <ArrowLeftBold />
          </el-icon>
          <el-icon @click="router.go(1)" class="icon-arrow">
            <ArrowRightBold />
          </el-icon>
        </div>
        <div class="header main">
          <el-button link @click="handleLink('home')">个性推荐</el-button>
          <el-button link @click="handleLink('playlist')">
            歌单
          </el-button>
          <el-button link>排行榜</el-button>
          <el-button link @click="handleLink('singer')">歌手</el-button>
          <el-button link>最新音乐</el-button>
        </div>
        <div class="header right">
          <el-input v-model="search" size="small" placeholder="搜索" :prefix-icon="Search" />
          <div @click="handleLogin">
            <el-image class="avtar" :src="userStore.avatar" fit="contain"></el-image>
          </div>
        </div>

      </el-header>
      <!--todo,路由切换后，滚动条回到顶部-->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-dialog v-model="userVisible" :show-close="false" @close="handleClearTimer">
      <user ref="userInfo"></user>
    </el-dialog>
    <Player></Player>
  </div>
</template>

<script setup lang="ts">
import { Search, ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { nextTick, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import user from '../view/Login.vue'
import { useUserStore, usePlayerStore } from '../store'
import Player from '../components/Player.vue'
import emiter from '../utils/bus'

const userStore = useUserStore()
const playerStore = usePlayerStore()

let mainMr = ref<string>('') // 底部外边距
let mainHeight = ref<string>('') // 高度

mainMr.value = playerStore.url ? '50px' : '0px'
mainHeight.value = playerStore.url ? '120px' : '50px'

const router = useRouter()
const search = ref<string>('')
let userInfo = ref()
let userVisible = ref<boolean>(false)

watch(() => playerStore.url, (newValue) => {
  mainMr.value = '50px'
  mainHeight.value = '120px'
})
function handleLink(param: string) {
  router.push({ name: param })
}
/**
 * 触发二维码扫码登录
 */
function handleLogin() {
  userVisible.value = true
  nextTick(async () => {
    await userInfo.value.login()
  })
}
/**
 * 关闭弹窗，清除计时器
 */
function handleClearTimer() {
  nextTick(async () => {
    await userInfo.value.clearTimer()
  })
}
/**
 * 扫码登录成功后，关闭扫码弹窗页面
 */
function handleCloseLogin(flag: boolean) {
  userVisible.value = flag
}
onMounted(async () => {
  if (localStorage.getItem('cookie')) {
    await userStore.getUserAccountInfo({ cookie: localStorage.getItem('cookie') })
  }
  emiter.on('closeLogin', (res: any) => {
    handleCloseLogin(res)
  })
})
</script>

<style lang="scss" scoped>
.common-layout {
  width: 100%;
}

:deep(.el-input__wrapper) {
  border-radius: 12px;
}

.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: rgb(249, 247, 247);

  .icon-arrow {
    width: 30px;
    height: 30px;
    margin: 0 8px;
    // color: #409eff;
    cursor: pointer;

    &:hover {
      background-color: gray;
      border-radius: 30px;
    }
  }

  &.left {
    margin-left: 80px;
  }

  &.main {
    margin-left: 30px;
  }

  &.right {
    width: 200px;
    margin-left: auto;
    margin-right: 10px;

    .avtar {
      width: 36px;
      height: 36px;
      margin-left: 15px;
      border: 1px solid white;
      border-radius: 24px;
      cursor: pointer;
    }
  }
}

.el-main {
  height: calc(100vh - v-bind(mainHeight));
  margin-bottom: v-bind(mainMr);
}
</style>
