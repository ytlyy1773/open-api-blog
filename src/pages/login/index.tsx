import { useState } from "react";
import Link from "next/link";
import { Form } from "@/components/form";
import { SubmitButton } from "@/components/submit-button";
import { postLoginApi } from "@/http/modules/ownUse";
import { checkForm } from "@/utils/businessCheck";
import { message } from "antd";
import { useRouter } from "next/router";
import { ResponseData } from "@/type";

interface LoginForm {
  email: string;
  password: string;
}

interface TokenType {
  token: string;
}

export default function Login() {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [timer, setTimer] = useState(false);
  async function handleFormSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      await checkForm(loginForm);
    } catch (error: any) {
      message.error(error.msg);
      return;
    }
    setTimer(true);
    try {
      const res: ResponseData<TokenType> = await postLoginApi(loginForm);
      window.localStorage.setItem(
        "open-api-token",
        JSON.stringify(res.data.token)
      );
      router.back();
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
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl max-sm:w-4/5">
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
              <Link
                href="/register"
                replace={true}
                className="font-semibold text-gray-800"
              >
                注册
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}
