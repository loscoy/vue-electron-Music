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
  // 获取歌曲详情 ids
  static getMusicDetails = (params: object) => request.get("/song/detail", { params });
  // 获取歌词 id
  static getLyric = (params: object) => request.get("/lyric", { params });
  // 获取歌曲链接  id
  static getMusicUrl = (params: object) => request.get("/song/url", { params });
  // 获取高品质歌曲链接  id
  static getHighMusicUrl = (params: object) => request.get("/song/download/url", { params });
  // 获取歌单详情  id,s:最近的s个收藏者
  static getPlaylistDetail = (params: object) => request.get("/playlist/detail", { params });
  /* 获取歌单所有歌曲  必选参数 : id : 歌单 id，可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量，
  可选参数 : offset : 默认值为0*/
  static getPlaylistSongs = (params: object) => request.get("/playlist/track/all", { params });
}
