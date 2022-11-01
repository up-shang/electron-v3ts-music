<template>
  <el-button @click="handleClickCat(item)" v-for="item in catList" :key="item.id" type="danger" size="small"
    class="catlist-wrapper" round>
    {{ item.playlistTag.name }}
  </el-button>
  <el-row :gutter="20">
    <el-col :span="4" v-for="item in playList" :key="item.id">
      <div class="personalized-wrapper" @click="handleLinkDetail(item.id)">
        <el-image :src="item.coverImgUrl"></el-image>
        <div class="personalized-count">
          <el-icon>
            <VideoPlay />
          </el-icon>
          <span>{{ formatNum(item.playCount) }}</span>
        </div>
        <p class="personalized-label">{{ item.name }}</p>
      </div>
    </el-col>
    <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.size" :total="pagination.total"
      layout="prev, pager, next" @current-change="handleCurrentChange" />
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCatList, getPlayList } from '../api/playlist'
import { VideoPlay } from '@element-plus/icons-vue'
import { formatNum } from '../utils'

const router = useRouter()
const catList = ref<Array<any>>([])
let cat = ref<string>('全部')
const playList = ref<Array<any>>([])
interface Pagination {
  page: number,
  size: number,
  total: number
}
const pagination = ref<Pagination>({
  page: 1,
  size: 18,
  total: 0
})
/**
 * init
 */
async function init() {
  await getCatListInfo()
  await getPlayListInfo()
}
/**
 * 获取歌单分类
 */
async function getCatListInfo() {
  const res = await getCatList()
  if (res.code === 200) catList.value = res.tags
}
/**
 * 获取歌单列表
 */
async function getPlayListInfo() {
  const params = {
    cat: cat.value,
    limit: pagination.value.size,
    offset: (pagination.value.page - 1) * pagination.value.size
  }
  const res = await getPlayList(params)
  if (res.code === 200) {
    playList.value = res.playlists
    pagination.value.total = res.total
  }
}
/**
 * 切换页码
 */
async function handleCurrentChange() {
  await getPlayListInfo()
}
/**
 * 点击分类查询歌单
 */
function handleClickCat(item: any) {
  cat.value = item.playlistTag.name
  pagination.value.page = 1
  getPlayListInfo()
}
/**
 * 跳转歌单详情
 */
function handleLinkDetail(playlistId: number) {
  router.push({ path: '/playlistDetail', query: { playlistId } })
}

init()


</script>

<style lang="scss" scoped>
:deep(.el-pager li.is-active) {
  color: #d81e06;
  cursor: default;
}

:deep(.el-pager li:hover) {
  color: #d81e06;
  cursor: pointer;
}

.catlist-wrapper {
  margin: 0 5px 20px;
}

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
</style>
