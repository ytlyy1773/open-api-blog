import request from "../request";

// 用户登录
export const postLoginApi = (data?: unknown) =>
  request({
    url: "/platform-user/login",
    data,
  });

// 用户注册
export const postRegisterApi = (data?: unknown) =>
  request({
    url: "/platform-user/register",
    data,
  });

// 发送注册验证码
export const postEmailSendApi = (data?: unknown) =>
  request({
    url: "/email/send",
    data,
  });
