import request from "../request";

export const postLoginApi = (data?: unknown) =>
  request({
    url: "/platform-user/login",
    data,
  });
