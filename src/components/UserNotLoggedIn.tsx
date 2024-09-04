"use client";

import { Button, Card } from "antd";
import Link from "next/link";
import { postUserInfoApi } from "@/http/modules/ownUse";

import { useState, useEffect } from "react";
import { ResponseData } from "@/type";

interface UserInfoType {
  email: string;
  id: number;
  username: string;
}

function useToken() {
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = window.localStorage.getItem("open-api-token");
      setToken(storedToken);
    }
  }, []);
  return token;
}

function NotLogin() {
  return (
    <>
      <div className="w-full p-20 flex items-center justify-center">
        <Link href="/login">
          <Button
            type="primary"
            className="primary-button h-10 w-40 rounded-full"
          >
            去登陆
          </Button>
        </Link>
      </div>
    </>
  );
}

function Login() {
  const [userInfo, setUserInfo] = useState<null | UserInfoType>(null);

  useEffect(() => {
    getUserInfo();
  });

  async function getUserInfo() {
    const res: ResponseData<UserInfoType> = await postUserInfoApi();
    setUserInfo(res.data);
  }

  return (
    <>
      {userInfo && (
        <div className="w-full">
          <Card title={userInfo?.username} style={{ margin: "1rem" }}>
            <p>邮箱： {userInfo?.email}</p>
            <p>id： {userInfo?.id}</p>
          </Card>
        </div>
      )}
    </>
  );
}

// 在组件中使用
export function UserNotLoggedIn() {
  const token = useToken();
  return <>{!token ? <NotLogin /> : <Login />}</>;
}
