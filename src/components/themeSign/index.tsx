"use client";

import { useEffect, useState } from "react";
import { Button, Dropdown, Space } from "antd";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import type { MenuProps } from "antd";

export default function SignButton() {
  const router = useRouter();

  const [status, setStatus] = useState(false);

  function signInHandle(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function logInHandle(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    router.push("/login");
  }

  function getToken() {
    const token = window.localStorage.getItem("open-api-token");
    if (!token) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }

  useEffect(() => {
    getToken();
  });

  const menuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "2") {
      window.localStorage.removeItem("open-api-token");
      getToken();
    }
    if (key === "1") {
      router.push("/docs/user");
    }
  };

  const items: MenuProps["items"] = [
    { key: "1", label: "个人信息" },
    { key: "2", label: "退出登录" },
  ];

  return (
    <>
      {!status ? (
        <Button
          type="primary"
          className={styles.signButton}
          onClick={logInHandle}
        >
          登录
        </Button>
      ) : (
        <Dropdown
          menu={{ items, onClick: menuClick }}
          trigger={["click", "hover"]}
          placement="bottom"
          arrow
        >
          <div className="theme-link-icon" onClick={signInHandle}>
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2342"
              width="30"
              height="30"
            >
              <path
                d="M512 64C264.58 64 64 264.58 64 512s200.58 448 448 448 448-200.58 448-448S759.42 64 512 64z m-0.26 192.52c70.55 0 127.74 57.19 127.74 127.74S582.29 512 511.74 512 384 454.81 384 384.26s57.19-127.74 127.74-127.74zM624 768H400c-61.86 0-112-50.14-112-112s50.14-112 112-112h224c61.86 0 112 50.14 112 112s-50.14 112-112 112z"
                fill="#1677ff"
                p-id="2343"
              ></path>
            </svg>
          </div>
        </Dropdown>
      )}
    </>
  );
}
