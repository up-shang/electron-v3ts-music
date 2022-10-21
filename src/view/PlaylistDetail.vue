<template>
  <span>歌单详情</span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { getPlayListDetail, PlaylistDetail } from '../api/playlist'

const route = useRoute()
const playlistId = route.query.playlistId

async function getPlayListDetailInfo() {
  const res = await getPlayListDetail<PlaylistDetail>({ id: playlistId })
  console.log(res, '====resplaylist')
  // songs: res.playlist.tracks,
  //         songsImg: res.playlist.coverImgUrl,
  //         songsText: res.playlist.name,
  //         songsDesc: res.playlist.description.substr(0, 15)
  //         res.playlist.tags
  //         res.playlist.playCount
}

onMounted(async () => {
  await getPlayListDetailInfo()
})
</script>

<style lang="scss" scoped>

</style>
