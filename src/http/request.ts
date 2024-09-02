import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/platform-user/login",
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 添加响应拦截器
instance.interceptors.response.use((response: AxiosResponse) => {
  const { data } = response;
  if (data.code === 200) {
    return data;
  } else {
    window.alert(data.msg);
    return Promise.reject(data);
  }
});

const request = (data: Record<string, any>) => {
  return instance({
    method: "post",
    data: {},
    ...data,
  });
};

export default request;

export { request, instance };
