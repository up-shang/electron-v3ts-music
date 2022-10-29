<template>
  <skeleton :loading="loading">
    <audio ref="audio" :src="playerStore.url"></audio>
    <el-row class="playlist-main">
      <el-col :span="7">
        <img class="playlist-pic" :src="playlist.pic" />
      </el-col>
      <el-col :span="17">
        <el-row class="playlist-mr">
          <el-col :span="3">
            <el-tag type="danger">歌单</el-tag>
          </el-col>
          <el-col :span="21">
            <h3 style="margin: 0">{{ playlist.name }}</h3>
          </el-col>
        </el-row>
        <el-row class="playlist-mr">
          <el-button @click="handlePlayAll" type="danger" round :icon="VideoPlay">播放全部</el-button>
          <el-button round :icon="Download">下载全部</el-button>
        </el-row>
        <el-row class="playlist-mr">
          <div class="playlist-ft">标签：</div>
          <el-tag v-for="tag in playlist.tag" class="playlist-tag" :key="tag" size="small">
            {{ tag }}
          </el-tag>
        </el-row>
        <el-row class="playlist-mr">
          <div class="playlist-ft">播放数：{{ formatNum(playlist.count) }}</div>
        </el-row>
        <el-row class="playlist-mr">
          <div class="playlist-ft">
            简&nbsp;&nbsp;&nbsp;&nbsp;介：
            {{ playlist.desc.substring(0, 85) }}{{ playlist.desc.length > 85 ? '...' : '' }}
          </div>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="playlistData" highlight-current-row stripe style="width: 100%; font-size: 12px;">
        <el-table-column type="index" :index="formatIndex" width="40px" />
        <el-table-column prop="name" label="歌曲">
          <template #default="{ row }">
            <div class="song-wrapper" @dblclick="handlePlay(row)">
              <div style="margin: 0 10px 0 0;">{{ row.name }}</div>
              <el-icon @click="handlePlay(row)" class="icon-display" color="#f56c6c" size="20px">
                <VideoPlay />
              </el-icon>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="ar" label="歌手" />
        <el-table-column prop="al" label="专辑" />
        <el-table-column prop="dt" label="时长" width="100px" />
      </el-table>
    </el-row>
  </skeleton>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import skeleton from '../components/Skeleton.vue'
import { getPlayListDetail, Playlist } from '../api/playlist'
import { getTrackInfo } from '../api/track'
import { Track } from '../api/track'
import { VideoPlay, Download } from '@element-plus/icons-vue'
import { formatNum, getDurations } from '../utils'
import { usePlayerStore } from '../store'
import { ElMessage } from 'element-plus'

const route = useRoute()
const playerStore = usePlayerStore()
let playlist = ref<Playlist>({
  list: [],
  pic: '',
  name: '',
  desc: '',
  tag: [],
  count: 0
})
const playlistId = route.query.playlistId
let loading = ref<boolean>(false)

// 歌曲信息array
const playlistData = ref<Array<Track>>()
/**
 * 格式化详情页数据
 */
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
  // 格式化列表歌曲arr
  playlistData.value = res.playlist.tracks.map((item: any) => {
    let obj: Track = {
      id: item.id,
      name: item.name,
      ar: formatSingerName(item.ar),
      al: item.al.name,
      dt: formatDr(item.dt),
      duration: item.dt / 1000,
      picUrl: item.al.picUrl
    }
    getTrackInfo({ id: item.id }).then(res => {
      obj.url = res.data[0].url
    })
    return obj
  })
  loading.value = false
}
/**
 * 处理歌手信息
 * @param singerArr 
 */
function formatSingerName(singerArr: any[]): string {
  let singerName: string
  singerName = singerArr.map(item => item.name).join('/')
  return singerName
}
/**
 * 处理歌曲时长
 * @param dt
 */
function formatDr(dt: number): string {
  let duration: string
  duration = getDurations(dt)
  return duration
}
/**
 * 处理列表序号
 */
function formatIndex(index: number): string | number {
  return index + 1 >= 10 ? index + 1 : '0' + (index + 1)
}

/**
 * 点击播放
 * 给全局track设置歌曲信息
 */
async function handlePlay(row: Track) {
  playerStore.setTrackInfo({
    id: row.id,
    name: row.name,
    url: row.url,
    ar: row.ar,
    al: row.al,
    dt: row.dt,
    duration: row.duration,
    picUrl: row.picUrl
  })
  const tmp = playlistData.value?.map((item) => {
    return item.url
  })
  const index = getTrackIndex(row.url, playerStore.list ?? [])
  if (index === -1) {
    setTrackList(tmp, playlistData.value)
  }
}
/**
 * 加入播放列表
 */
function handlePlayAll() {
  const tmp = playlistData.value?.map(item => item.url)
  const index = tmp?.indexOf(playerStore.url)
  if (index === -1) {
    setTrackList(tmp, playlistData.value)
    ElMessage({
      message: '已添加全部歌曲到播放列表',
      type: 'success',
      duration: 1500
    })
  }
}
/**
 * 给howler TrackList赋值
 */
function setTrackList(list: any, allListInfo: any) {
  playerStore.setTrackList(list, allListInfo)
}
/**
 * 获取当前歌曲index
 */
function getTrackIndex(url: string | undefined, list: any[]) {
  return list.indexOf(url)
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

.song-wrapper {
  display: flex;
  align-items: center;

  .icon-display {
    display: none;
  }

  &:hover {
    .icon-display {
      display: block;
      cursor: pointer;
    }
  }
}
</style>
