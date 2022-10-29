<template>
  <el-carousel :interval="4000" type="card" height="160px">
    <el-carousel-item v-for="item in banner?.banners" :key="item">
      <el-image :src="item.imageUrl"></el-image>
    </el-carousel-item>
  </el-carousel>

  <h3 style="text-align: left;">推荐歌单</h3>
  <el-row :gutter="20">
    <el-col :span="4" v-for="item in personalized?.result" :key="item">
      <div class="personalized-wrapper" @click="handleLinkDetail(item.id)">
        <el-image :src="item.picUrl"></el-image>
        <div class="personalized-count">
          <el-icon>
            <VideoPlay />
          </el-icon>
          <span>{{             formatNum(item.playCount)             }}</span>
        </div>
        <p class="personalized-label">{{             item.name             }}</p>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { VideoPlay } from '@element-plus/icons-vue'
import { getBanner, getPersonalized, BannerInfo, Personalized } from '../api/home'
import { formatNum } from '../utils'

const router = useRouter()
let banner = ref<BannerInfo>()
let personalized = ref<Personalized>()
/**
 * 轮播
 */
async function getBannerInfo() {
  banner.value = await getBanner()
}
/**
 * 推荐歌单
 */
async function getPersonalizedInfo() {
  const params = {
    limit: 12
  }
  personalized.value = await getPersonalized(params)
}
/**
 * 跳转歌单详情页
 */
function handleLinkDetail(playlistId: number) {
  router.push({ path: '/playlistDetail', query: { playlistId } })
}
onMounted(async () => {
  await getBannerInfo()
  await getPersonalizedInfo()
})

</script>
<style scoped>
.el-image {
  cursor: pointer;
  border-radius: 8px;
}

.personalized-wrapper {
  position: relative;
}

.personalized-count {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  width: 80px;
  height: 25px;
  top: 0;
  right: 5px;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

.personalized-label {
  font-size: 12px;
  text-align: left;
  font-weight: bold;
  margin: 0 0 20px 0;
}

h3 {
  margin: 10px 0 10px 0;
}
</style>
