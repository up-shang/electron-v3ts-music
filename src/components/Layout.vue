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
          <el-image class="avtar" :src="avtar" fit="contain">
            <template #placeholder>
              <div class="image-slot">Loading</div>
            </template>
          </el-image>
        </div>

      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const avtar = ref<string>('')
const search = ref<string>('')

function handleLink(param: string) {
  router.push({ name: param })
}
// defineProps<{ msg: string }>()
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
      width: 30px;
      height: 24px;
      border: 1px solid white;
      border-radius: 24px;
      margin-left: 15px;
    }
  }
}
</style>
