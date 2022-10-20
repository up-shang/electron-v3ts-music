import { get } from '../../utils/http/axios'

enum URL {
  banner = '/banner', // 轮播
  personalized = '/personalized' // 推荐歌曲
}
export interface BannerInfo {
  banners: any[],
  code: number
}

export interface Personalized {
  result: any[],
  code: number
}
const getBanner = async () => get<BannerInfo>({ url: URL.banner })
const getPersonalized = async (params: object) => get<Personalized>({ url: URL.personalized, params })
export { getBanner, getPersonalized }