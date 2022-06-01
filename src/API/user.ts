import request from "@/plugins/axios/request";

export class userService {
  // 获取登录状态
  static loginStatus = () => request.get("/login/status");
  // 获取当前登录用户信息
  static getCurrentUserInfo = () => request.get("/user/account");
  // 获取朋友动态
  static getfriendDynamics = (params: any) => request.get("/event", { params });
  // 手机号登录 phone password
  static postLogin = (params: any) => request.get("/login/cellphone", { params });
  // 手机号注册 phone password nickname captcha
  static postregister = (params: any) => request.get("/register/cellphone", { params });
  // 退出登录
  static logOut = () => request.get("/logout");
}
