"use client";

import { Callout } from "nextra/components";
import { Tag, Button } from "antd";
import Link from "next/link";
import { useToken } from "@/pageTsx/docs/UserNotLoggedIn";

function LoginWarn() {
  const token = useToken();
  return (
    <>
      <Callout type="warning">
        该接口需要登录获取
        <Tag className="ml-2" bordered={false}>
          token
        </Tag>
        使用
        {!token && (
          <Link href="/login">
            <Button type="link">去登陆</Button>
          </Link>
        )}
      </Callout>
    </>
  );
}

export default LoginWarn;

export { LoginWarn };
