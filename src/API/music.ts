import { request } from "../plugins/axios/request";

export class musicService {
  //  获取日推歌曲
  static getDaliyRecommend(params: {} | undefined) {
    return request("/recommend/songs", params, "get");
  }
}
