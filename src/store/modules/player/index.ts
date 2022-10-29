import { defineStore } from 'pinia';
import { Track, getTrackInfo } from '../../../api/track'

export const usePlayerStore = defineStore('player', {
  state: (): Track => ({
    list: [],
    allListInfo: [],
    id: 0,
    name: '',
    url: '',
    ar: '',
    al: '',
    dt: '',
    duration: 0,
    picUrl: ''
  }),
  getters: {
  },
  actions: {
    // 获取歌曲信息
    async getTrackInfo() {
      const params = {
        id: this.id
      }
      const result = await getTrackInfo(params)
      return result
    },
    setSongId(songId: number) {
      this.$patch({ id: songId })
    },
    setTrackList(list: any, allListInfo: any) {
      this.list?.push(...list)
      this.allListInfo?.push(...allListInfo)
      // this.$patch({ list, allListInfo })
    },
    setTrackInfo(track: any) {
      const { id, name, url, ar, al, dt, duration, picUrl } = track
      this.$patch({ id, name, url, ar, al, dt, duration, picUrl })
    }
  }
})
