import { checkEmail } from "./check";

interface RejectType {
  msg: string;
}

export function checkForm(params: {
  email: string;
  password: string;
}): Promise<boolean | RejectType> {
  return new Promise((resolve, reject) => {
    if (!params.email || !checkEmail(params.email)) {
      return reject({
        msg: "邮箱错误",
      });
    }
    if (!params.password || params.password.length < 8) {
      return reject({
        msg: "密码需大于8位数",
      });
    }
    const regex: RegExp = /^(?=.*[0-9])(?=.*[a-zA-Z])/;
    if (!regex.test(params.password)) {
      return reject({
        msg: "密码需包含字母和数字",
      });
    }
    return resolve(true);
  });
}
