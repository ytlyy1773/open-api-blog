"use client";

import { Callout } from "nextra/components";
import { Tag, Button } from "antd";
import Link from "next/link";

function LoginWarn() {
  return (
    <>
      <Callout type="warning">
        该接口需要登录获取
        <Tag className="ml-2" bordered={false}>
          token
        </Tag>
        使用
        <Link href="/login">
          <Button type="text">去登陆</Button>
        </Link>
      </Callout>
    </>
  );
}

export default LoginWarn;

export { LoginWarn };
