import { ResponseData } from "@/type";
import request from "../request";

// 获取随机图片
export const postRandomImageApi = (): Promise<ResponseData<string>> =>
  request({
    url: "/random/image",
    method: "get",
  });
