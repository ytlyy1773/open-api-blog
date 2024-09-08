import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { postEmailSendApi } from "@/http/modules/ownUse";
import { message } from "antd";
import { checkEmail } from "@/utils/check";

export function Form({
  children,
  emitsEmail,
  emitsPassword,
  emitsCode,
  emitsInvitationCode,
}: {
  children: React.ReactNode;
  emitsEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emitsPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emitsCode?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emitsInvitationCode?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [count, setCount] = useState(60);
  const [codeValue, setCodeValue] = useState("");

  const handleSendCode = async () => {
    if (!email || !checkEmail(email)) {
      return message.error("邮箱错误");
    }
    setIsCodeSent(true);
    try {
      const res = await postEmailSendApi({ email });
      message.success(res.msg);
      let currentCount = count;
      const intervalId = setInterval(() => {
        if (currentCount <= 0) {
          clearInterval(intervalId);
          setIsCodeSent(false);
          return;
        }
        currentCount--;
        setCount(currentCount);
      }, 1000);
    } catch (error) {
      setIsCodeSent(false);
    }
  };

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    emitsEmail(event);
  };

  const changeInvitationCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeValue(event.target.value);
    emitsInvitationCode?.(event);
  };

  const router = useRouter();

  useEffect(() => {
    if (router.query.code) {
      setCodeValue(router.query.code as string);
    }
  }, [router]);

  return (
    <form className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          电子邮件
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="openapijs@163.com"
          autoComplete="email"
          required
          maxLength={60}
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          onChange={changeEmail}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          密码
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="含字母和数字不低于8位数字"
          required
          maxLength={32}
          onChange={emitsPassword}
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      {emitsCode && (
        <div>
          <label
            htmlFor="verification-code"
            className="block text-xs text-gray-600 uppercase"
          >
            验证码
          </label>
          <div className="relative mt-1">
            <input
              id="verification-code"
              name="verification-code"
              type="text"
              placeholder="输入验证码"
              required
              maxLength={6}
              onChange={emitsCode}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
            <button
              type="button"
              onClick={handleSendCode}
              disabled={isCodeSent}
              className={`absolute inset-y-0 right-0 flex items-center px-3 text-sm rounded-r-md focus:ring-2 focus:ring-offset-2 ${
                isCodeSent
                  ? "bg-gray-400 cursor-not-allowed text-gray-200"
                  : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-black"
              }`}
            >
              {!isCodeSent ? "获取验证码" : `${count}秒`}
            </button>
          </div>
        </div>
      )}
      {emitsInvitationCode && (
        <div>
          <label
            htmlFor="email"
            className="block text-xs text-gray-600 uppercase"
          >
            邀请码
          </label>
          <input
            value={codeValue}
            id="code"
            name="text"
            type="text"
            placeholder="邀请码"
            required
            maxLength={8}
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            onChange={changeInvitationCode}
          />
        </div>
      )}
      {children}
    </form>
  );
}
