import { useState } from "react";
import Link from "next/link";
import { Form } from "@/components/form";
import { SubmitButton } from "@/components/submit-button";
import { postLoginApi } from "@/http/modules/ownUse";
import { checkForm } from "@/utils/businessCheck";
import { message } from "antd";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [timer, setTimer] = useState(false);
  async function handleFormSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log("loginForm--", loginForm);

    try {
      await checkForm(loginForm);
    } catch (error: any) {
      message.error(error.msg);
      return;
    }
    setTimer(true);
    try {
      const {
        data: { token },
      } = await postLoginApi(loginForm);
      console.log("token---", token);
      setTimer(false);
    } catch (error) {
      setTimer(false);
    }
  }

  function changeEmailHandle(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function changePasswordHandle(event: React.ChangeEvent<HTMLInputElement>) {
    loginForm.password = event.target.value;
    const { name, value } = event.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">登录</h3>
            <p className="text-sm text-gray-500">使用您的电子邮件和密码登录</p>
          </div>
          <Form
            emitsEmail={changeEmailHandle}
            emitsPassword={changePasswordHandle}
          >
            <SubmitButton loading={timer} onSubmit={handleFormSubmit}>
              登录
            </SubmitButton>
            <p className="text-center text-sm text-gray-600">
              沒有账户？ &nbsp;
              <Link href="/register" className="font-semibold text-gray-800">
                注册
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}
