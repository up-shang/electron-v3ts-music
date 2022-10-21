<template>
  <div class="common-layout">
    <el-container>
      <el-header height="50px" class="header">
        <div class="header main">
          <el-button link @click="handleLink('home')">个性推荐</el-button>
          <el-button link @click="handleLink('song')">
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
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-dialog v-model="userVisible" :show-close="false" @close="handleClearTimer">
      <user ref="userInfo"></user>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { nextTick, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import user from '../view/login.vue'
import { useUserStore } from '../store'

const userStore = useUserStore()

const router = useRouter()
const search = ref<string>('')
let userInfo = ref()
let userVisible = ref<boolean>(false)

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
onMounted(async () => {
  if (localStorage.getItem('cookie')) {
    await userStore.getUserAccountInfo({ cookie: localStorage.getItem('cookie') })
  }
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

  &.main {
    margin-left: 100px;
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
  height: calc(100vh - 50px);
}
</style>
