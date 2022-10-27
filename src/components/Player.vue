<template>
  <div class="player-wrapper">
    <el-slider v-model="progress" :show-tooltip="false" />
    <el-row class="row-class">
      <el-col :span="8" class="col-class col-1">
        <img class="col-img" src="https://p2.music.126.net/zrMDwLyZk17F3unB8ZyYYQ==/18872017579261383.jpg" />
        <div class="col-1-content">
          <div>
            忘情水&nbsp;-&nbsp;<span style="color: gray">刘德华</span>
          </div>
          <div style="color: gray">00:00&nbsp;/&nbsp;05:00</div>
        </div>
      </el-col>
      <el-col :span="8" class="col-class col-2">
        <svg-icon icon-name="love" :font-size="20" color="gray" class="player-icon"></svg-icon>
        <svg-icon icon-name="preTrack" :font-size="24" color="#d81e06" class="player-icon"></svg-icon>
        <svg-icon icon-name="play" :font-size="42" class="player-icon"></svg-icon>
        <svg-icon icon-name="nextTrack" :font-size="24" color="#d81e06" class="player-icon"></svg-icon>
        <svg-icon icon-name="random" :font-size="16" color="gray" class="player-icon"></svg-icon>
      </el-col>
      <el-col :span="8" class="col-class col-3">
        <svg-icon icon-name="list" :font-size="22" color="gray" class="player-icon" style="margin-right: 10px;">
        </svg-icon>
        <svg-icon icon-name="volume" :font-size="20" color="gray" class="player-icon"></svg-icon>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let progress = ref<number>(0)
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

.player-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 68px;
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
