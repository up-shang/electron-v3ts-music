<template>
  <span>{{playlist?.name}}</span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { getPlayListDetail, Playlist } from '../api/playlist'

const route = useRoute()
let playlist = ref<Playlist>()
const playlistId = route.query.playlistId

async function getPlayListDetailInfo() {
  const res = await getPlayListDetail({ id: playlistId })
  playlist.value = {
    list: res.playlist.tracks,
    pic: res.playlist.coverImgUrl,
    name: res.playlist.name,
    desc: res.playlist.description,
    tag: res.playlist.tags,
    count: res.playlist.playCount
  }
}

onMounted(async () => {
  await getPlayListDetailInfo()
})
</script>

<style lang="scss" scoped>

</style>
