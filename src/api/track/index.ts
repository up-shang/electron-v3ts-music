import { get } from '../../utils/http/axios'

enum URL {
  track = '/song/url', // 歌单详情
  lyric = '/lyric' //获取歌词
}
export interface TrackList {
  list: any[]
}

// 歌曲信息info
export interface Track {
  player?: any,
  list?: any[],
  allListInfo?: any[],
  id: number,
  name: string,
  url?: string,
  ar: string,
  al: string,
  dt: string,
  duration: number,
  picUrl: string
}

const getTrackInfo = async (params: { id: number }) => get<any>({ url: URL.track, params })
const getLyric = async (params: { id: number }) => get<any>({ url: URL.lyric, params })
export { getTrackInfo, getLyric }