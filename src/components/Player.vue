<template>
  <div class="player-wrapper">
    <el-slider v-model="player.progress" :max="playerStore.duration" @input="handleChangeSeek" :show-tooltip="false" />
    <el-row class="row-class">
      <el-col :span="8" class="col-class col-1">
        <img @click="handleOpen" class="col-img" :src="playerStore.picUrl" />
        <div class="col-1-content">
          <div>
            {{ playerStore.name }}&nbsp;-&nbsp;<span style="color: gray">{{ playerStore.ar }}</span>
          </div>
          <div style="color: gray">{{ player.currentTime }}&nbsp;/&nbsp;{{ playerStore.dt }}</div>
        </div>
      </el-col>
      <el-col :span="8" class="col-class col-2">
        <svg-icon icon-name="love" :font-size="20" color="gray" class="player-icon"></svg-icon>
        <svg-icon icon-name="preTrack" @click="handlePlayPreTrack" :font-size="24" color="#d81e06" class="player-icon">
        </svg-icon>
        <svg-icon v-if="!player.playing" @click="playOrPause" icon-name="play" :font-size="42" class="player-icon">
        </svg-icon>
        <svg-icon v-if="player.playing" @click="playOrPause" icon-name="pause" :font-size="42" class="player-icon">
        </svg-icon>
        <svg-icon icon-name="nextTrack" @click="handlePlayNextTrack" :font-size="24" color="#d81e06"
          class="player-icon"></svg-icon>
        <svg-icon icon-name="random" :font-size="16" color="gray" class="player-icon"></svg-icon>
      </el-col>
      <el-col :span="8" class="col-class col-3">
        <el-popover placement="top" :width="400" trigger="click" @show="handlePopoverShow" @hide="handlePopoverHide">
          <template #reference>
            <svg-icon icon-name="list" :font-size="22" :color="playlistIconColor" class="player-icon"
              style="margin-right: 10px;">
            </svg-icon>
          </template>
          <el-table :data="playerStore.allListInfo" highlight-current-row stripe
            style="width: 100%; font-size: 12px; height: 500px;">
            <el-table-column prop="name" label="歌曲">
              <template #default="{ row }">
                <div class="song-wrapper" @dblclick="handlePlay(row)">
                  <div style="margin: 0 10px 0 0;">{{ row.name }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="ar" label="歌手" />
            <el-table-column prop="dt" label="时长" width="100px" />
          </el-table>
        </el-popover>
        <el-popover placement="top" trigger="click" @show="() => { volumeIconColor = '#d81e06' }"
          @hide="() => { volumeIconColor = 'gray' }">
          <template #reference>
            <svg-icon icon-name="volume" :font-size="20" :color="volumeIconColor" class="player-icon"></svg-icon>
          </template>
          <el-slider v-model="player.volume" vertical height="100px" :max="10" @input="handleChangeVolume"
            :show-tooltip="false" style="float: right;" />
        </el-popover>
      </el-col>
    </el-row>
  </div>
  <!--封面、歌词抽屉-->
  <el-drawer v-model="playerDetailVisible" size="100%" direction="btt" :show-close="false">
    <template #header>
      <el-icon style="justify-content: flex-start;cursor: pointer;">
        <ArrowDownBold @click="handleClose" />
      </el-icon>
    </template>
    <template #default>
      <div class="player-detail">
        <img ref="playerPic" class="player-pic" :src="playerStore.picUrl" />
        <div class="player-lyric"></div>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ArrowDownBold } from '@element-plus/icons-vue'
import { usePlayerStore } from '../store'
import { Track } from '../api/track'
import Player from '../utils/player'
import _ from 'lodash'

const player = ref<any>(new Player())
const playerStore = usePlayerStore()
let playlistIconColor = ref<string>('gray')
let volumeIconColor = ref<string>('gray')

let playerDetailVisible = ref<boolean>(false) // 是否弹出歌曲封面、歌词详情
let playerPic = ref() // 封面ref

watch(() => playerStore.url, (newValue) => {
  if (newValue) {
    player.value.current = playerStore.list?.indexOf(newValue)
    player.value.playAudioSource([newValue])
    player.value.play()
  }
})
function handleOpen() {
  playerDetailVisible.value = true
}
function handleClose() {
  playerDetailVisible.value = false
}
/**
 * 快进快退歌曲
 * @param seek 
 */
function handleChangeSeek(seek: number) {
  _.debounce(() => {
    player.value.seek(seek)
  }, 1000)
}

function handlePlayPreTrack() {
  player.value._preTrackCallback()
}

function handlePlayNextTrack() {
  player.value._nextTrackCallback()
}
function playOrPause() {
  if (player.value.playing) {
    playerPic.value.style.animationPlayState = 'paused'
  } else {
    playerPic.value.style.animationPlayState = 'running'
  }
  player.value.playOrPause()
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
}

/**
 * 显示播放列表时，改变图标颜色
 */
function handlePopoverShow() {
  playlistIconColor.value = '#d81e06'
}

/**
 * 隐藏播放列表时，改变图标颜色
 */
function handlePopoverHide() {
  playlistIconColor.value = 'gray'
}
/**
 * 控制声音大小
 */
function handleChangeVolume(val: number) {
  player.volume = val / 10
}
</script>

<style lang="scss" scoped>
:deep(.el-slider) {
  height: 10px;
}

:deep(.el-slider__button) {
  width: 6px;
  height: 6px;
  border-color: #d81e06;
  background-color: #d81e06;
}

:deep(.el-slider__button-wrapper) {
  height: 32px;
}

:deep(.el-slider__bar) {
  height: 2px;
  background-color: #d81e06;
}

:deep(.el-slider__runway) {
  height: 2px;
}

.player-detail {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -48px;

  .player-pic {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    outline: 50px solid black;
    animation: audio-img-360 60s linear infinite;
    animation-play-state: running;
    margin-left: 50px;
  }

  @keyframes audio-img-360 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .player-lyric {
    flex: 1
  }
}

.player-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 68px;
  z-index: 9999;
  // border-top: 2px solid #eee;
  background-color: #fff;

  .row-class {
    align-items: center;
    height: 50px;

    .col-class {
      display: flex;
      align-items: center;
      padding: 0 10px;

      .player-icon {
        cursor: pointer;
        margin: 0 8px;
      }

      .col-img {
        width: 40px;
        height: 40px;
        border-radius: 4px;
        margin-right: 10px;
        cursor: pointer;
      }
    }

    .col-1 {
      .col-1-content {
        font-size: 12px;
      }
    }

    .col-2 {
      display: flex;
      justify-content: center;
    }

    .col-3 {
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
    }
  }
}
</style>
