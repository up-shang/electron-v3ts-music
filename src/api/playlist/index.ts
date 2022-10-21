import { get } from '../../utils/http/axios'

enum URL {
  playListDetail = '/playlist/detail' // 歌单详情
}

export interface PlaylistDetail {
  list: object[],
  pic: string,
  name: string,
  desc: string
  tag: string[]
  count: number
}
const getPlayListDetail = async (params: object) => get<PlaylistDetail>({ url: URL.playListDetail, params })
export { getPlayListDetail }