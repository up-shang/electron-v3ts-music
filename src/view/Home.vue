<template>
  <el-carousel :interval="4000" type="card" height="160px">
    <el-carousel-item v-for="item in banner?.banners" :key="item">
      <el-image :src="item.imageUrl"></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getBanner, BannerInfo } from '../api/home'

let banner = ref<BannerInfo>()
async function getBannerInfo() {
  banner.value = await getBanner()
}
onMounted(async () => {
  await getBannerInfo()
})

</script>
<style scoped>
.el-carousel__item {
  border-radius: 8px;
}
</style>
