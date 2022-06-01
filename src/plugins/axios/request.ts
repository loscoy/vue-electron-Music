import axios from "axios";
import { userService } from "@/API/user";
import { showMessage } from "./status"; // 引入状态码文件
import { ElMessage } from "element-plus"; // 引入el 提示框
import { useUserStore } from "@/store/modules/user";

const refreshStatus = () => {
  const user = useUserStore();
  const setUserId = (id: string) => {
    user.uid = id;
  };
  const loginStatus = async () => {
    const status = await userService.loginStatus();
    console.log(status.data.data);
    if (status.data.data.account !== null) {
      setUserId(status.data.data.account.id);
    }
  };
  loginStatus();
};

const request = axios.create({
  baseURL: "/api",
  timeout: 30000,
  withCredentials: true, // 允许跨域设置，不然可能因为拿不到cookie而报错
});

//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // 配置请求头
    config.headers = {
      //'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
      "Content-Type": "application/json;charset=UTF-8", // 传参方式json
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      if (response.status === 301) {
        refreshStatus();
        const config = response.config;
        config.baseURL = "";
        return request(config);
      }
      showMessage(response.status); // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data);
    } else {
      ElMessage.warning("网络连接异常,请稍后再试!");
    }
  }
);
export default request;
