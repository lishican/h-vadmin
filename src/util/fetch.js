import axios from "axios";
// 创建axios实例
const service = axios.create({
  baseURL: "/api",
  timeout: 15000
});
// request拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
// respone拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error;
  }
);
export default service;
