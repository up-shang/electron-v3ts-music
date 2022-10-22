<template>
  <skeleton :loading="loading">
    <el-row class="playlist-main">
      <el-col style="text-align: center;" :span="8">
        <img class="playlist-pic" :src="playlist?.pic" />
      </el-col>
      <el-col :span="16">
        <el-row class="playlist-mr">
          <el-col :span="3">
            <el-tag type="danger">歌单</el-tag>
          </el-col>
          <el-col :span="21">
            <h3 style="margin: 0">{{playlist?.name}}</h3>
          </el-col>
        </el-row>
        <el-row class="playlist-mr">
          <el-button type="danger" round :icon="VideoPlay">播放全部</el-button>
          <el-button round :icon="Download">下载全部</el-button>
        </el-row>
        <el-row class="playlist-mr">
          <div class="playlist-ft">标签：</div>
          <el-tag v-for="tag in playlist?.tag" class="playlist-tag" :key="tag" size="small">
            {{ tag }}
          </el-tag>
        </el-row>
        <el-row class="playlist-mr">
          <div class="playlist-ft">播放数：{{formatNum(playlist?.count as number)}}</div>
        </el-row>
        <el-row class="playlist-mr">
          <div class="playlist-ft">
            简&nbsp;&nbsp;&nbsp;&nbsp;介：
            {{playlist?.desc.substring(0,85)}}...
          </div>
        </el-row>
      </el-col>
    </el-row>
  </skeleton>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import skeleton from '../components/Skeleton.vue'
import { getPlayListDetail, Playlist } from '../api/playlist'
import { VideoPlay, Download } from '@element-plus/icons-vue'
import { formatNum } from '../utils'

const route = useRoute()
let playlist = ref<Playlist>()
const playlistId = route.query.playlistId
let loading = ref<boolean>(false)

async function getPlayListDetailInfo() {
  loading.value = true
  const res = await getPlayListDetail({ id: playlistId })
  playlist.value = {
    list: res.playlist.tracks,
    pic: res.playlist.coverImgUrl,
    name: res.playlist.name,
    desc: res.playlist.description,
    tag: res.playlist.tags,
    count: res.playlist.playCount
  }
  loading.value = false
}

onMounted(async () => {
  await getPlayListDetailInfo()
})
</script>

<style lang="scss" scoped>
.playlist-main {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 0 20px;
}

.playlist-pic {
  width: 215px;
  height: 215px;
  border-radius: 10px;
}

.playlist-mr {
  margin: 0 0 20px;
}

.playlist-tag {
  margin: 0 5px;
  text-align: right;
}

.playlist-ft {
  font-size: 12px;
  line-height: 20px;
}
</style>
