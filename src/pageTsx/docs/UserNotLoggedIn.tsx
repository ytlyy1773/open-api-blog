"use client";

import { Button, Card, message, Tag } from "antd";
import { useState, useEffect } from "react";
import { ResponseData } from "@/type";
import NotLogin from "@/components/NotLogin";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  postUserInfoApi,
  postCreateInvitationApi,
  postInvitationListApi,
} from "@/http/modules/ownUse";

interface UserInfoType {
  email: string;
  id: number;
  username: string;
  daily_email_limit: number;
}

interface InvitationType {
  code: string;
  id: number;
  createdTime: number;
}

function Login() {
  const [userInfo, setUserInfo] = useState<null | UserInfoType>(null);
  const [userInvitationList, setUserInvitationList] = useState<
    null | InvitationType[]
  >(null);
  useState<null | UserInfoType>(null);

  let apiBoon = false;

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    if (apiBoon) {
      return;
    }
    // 关闭阀门
    apiBoon = true;
    try {
      const res: ResponseData<UserInfoType> = await postUserInfoApi();
      setUserInfo(res.data);
      getInvitationList();
    } catch (error) {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("open-api-token");
      }
    }
  }

  async function getInvitationList() {
    const res: ResponseData<InvitationType[]> = await postInvitationListApi();
    setUserInvitationList(res.data);
  }

  async function createInvitationHandle() {
    const res: ResponseData<string> = await postCreateInvitationApi();
    message.success(res.msg);
  }

  return (
    <>
      {userInfo && (
        <main className="w-full">
          <Card title={userInfo?.username} style={{ margin: "1rem" }}>
            <div className="flex justify-between">
              <div>邮箱：</div>
              <span style={{ color: "#333" }}>{userInfo?.email}</span>
            </div>
            <div className="flex justify-between mt-2">
              <div>用户id：</div>
              <span style={{ color: "#333" }}>{userInfo?.id}</span>
            </div>
            <div className="flex justify-between mt-2">
              <div>今日剩余可发送邮件次数：</div>
              <span style={{ color: "#333" }}>
                {userInfo?.daily_email_limit}
              </span>
            </div>
          </Card>
          <Card
            title="邀请码管理"
            extra={
              userInfo && (
                <Button
                  type="link"
                  className="p-0"
                  onClick={createInvitationHandle}
                >
                  生成邀请码
                </Button>
              )
            }
            style={{ margin: "1rem" }}
          >
            <div className="flex justify-between font-bold">
              <div>
                邀请码&nbsp;
                <span className="font-normal">
                  {userInvitationList?.length || 0} / 10
                </span>
              </div>
              <span>创建时间</span>
            </div>
            {userInvitationList?.map((item) => {
              return (
                <div
                  key={item.code}
                  className="flex items-center justify-between mt-2"
                >
                  <div className="flex items-center">
                    {item.code}
                    <CopyToClipboard
                      text={`https://www.openapijs.com/register?code=${item.code}`}
                    >
                      <Button type="link" className="px-2">
                        复制邀请链接
                      </Button>
                    </CopyToClipboard>
                  </div>
                  <span style={{ color: "#333" }}>{item.createdTime}</span>
                </div>
              );
            })}
          </Card>
        </main>
      )}
    </>
  );
}

export function useToken() {
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = window.localStorage.getItem("open-api-token");
      storedToken && setToken(JSON.parse(storedToken));
    }
  }, []);
  return token;
}

export function showToken() {
  const token = useToken();
  return (
    <>
      {token && (
        <div className="mt-10">
          <Tag bordered={false} color="processing">
            {token}
          </Tag>
          <CopyToClipboard text={token}>
            <Button type="link" className="px-2">
              复制token
            </Button>
          </CopyToClipboard>
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
