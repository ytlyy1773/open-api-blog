"use client";

import { useEffect, useState } from "react";
import { Button } from "antd";
import styles from "./index.module.css";
import { useRouter } from "next/router";

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

  useEffect(() => {
    const token = window.localStorage.getItem("open-api-token");
    if (!token) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  });

  return (
    <>
      {!status ? (
        <Button
          type="primary"
          className={styles.signButton}
          onClick={logInHandle}
        >
          登陆
        </Button>
      ) : (
        <div onClick={signInHandle}>
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="28973"
            width="28"
            height="28"
          >
            <path
              d="M512 288m-224 0a224 224 0 1 0 448 0 224 224 0 1 0-448 0Z"
              fill="#1677ff"
              p-id="28974"
            ></path>
            <path
              d="M448 320h128a64 64 0 1 1-128 0z"
              fill="#1677ff"
              p-id="28975"
            ></path>
            <path
              d="M96 576m192 0l448 0q192 0 192 192l0 0q0 192-192 192l-448 0q-192 0-192-192l0 0q0-192 192-192Z"
              fill="#1677ff"
              p-id="28976"
            ></path>
          </svg>
        </div>
      )}
    </>
  );
}
