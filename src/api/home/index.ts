import { get } from '../../utils/http/axios'

enum URL {
  banner = '/banner'
}
export interface BannerInfo {
  banners: any[],
  code: number
}
const getBanner = async () => get<BannerInfo>({ url: URL.banner })

export { getBanner }