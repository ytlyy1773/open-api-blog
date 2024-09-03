import axios, { AxiosResponse } from "axios";
import { message } from "antd";
import { ResponseData } from "@/type";

const instance = axios.create({
  baseURL: "http://localhost:4000",
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
    message.error(data.msg);
    return Promise.reject(data);
  }
});

const request = <T>(data: Record<string, any>): Promise<ResponseData<T>> => {
  return instance({
    method: "post",
    data: {},
    ...data,
  });
};

export default request;

export { request, instance };
