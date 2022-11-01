import { get } from '../../utils/http/axios'

enum URL {
  playListDetail = '/playlist/detail', // 歌单详情
  catlist = '/playlist/hot', // 热门歌单分类
  playList = '/top/playlist' // 热门歌单
}

export interface PlaylistDetail {
  playlist: {
    tracks: object[],
    playCount: number,
    coverImgUrl: string,
    name: string,
    id: number,
    tags: string[],
    description: string
  }
}

export interface Playlist {
  list: object[],
  pic: string,
  name: string,
  desc: string
  tag: string[]
  count: number
}
const getPlayListDetail = async (params: object) => get<PlaylistDetail>({ url: URL.playListDetail, params })
const getPlayList = async (params: object) => get<any>({ url: URL.playList, params })
const getCatList = async () => get<any>({ url: URL.catlist })
export { getPlayListDetail, getCatList, getPlayList }