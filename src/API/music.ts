import request from "../plugins/axios/request";

export class musicService {
  //  获取日推歌曲
  static getDaliyRecommend = () => request.get("/recommend/songs");
  // 获取登录状态
  static loginStatus = () => request.get("/login/status");
  // 获取轮播图
  static getBanner = () => request.get("/banner?type=0");
  // 获取推荐歌单
  static getRecPlaylist = () => request.get("/recommend/resource");
  // 推荐新音乐
  static getNewSongs = (params: object) => request.get("/personalized/newsong", { params });
  // 私人FM
  static getPersonalFM = () => request.get("/personal_fm");
  // 获取用户歌单
  static getUserPlaylist = (params: object) => request.get("/user/playlist", { params });
}
