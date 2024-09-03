import { useState } from "react";
import Link from "next/link";
import { Form } from "@/components/form";
import { SubmitButton } from "@/components/submit-button";
import { postRegisterApi } from "@/http/modules/ownUse";
import { checkForm } from "@/utils/businessCheck";
import { message } from "antd";
import { useRouter } from "next/router";

interface LoginForm {
  email: string;
  password: string;
  emailCode: string;
}

export default function Login() {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
    emailCode: "",
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
      const res = await postRegisterApi(loginForm);
      message.success(res.msg);
      router.replace("/login");
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
    const { name, value } = event.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function changeCodeHandle(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginForm((prevState) => ({
      ...prevState,
      emailCode: event.target.value,
    }));
  }

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl max-sm:w-4/5">
          <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">注册</h3>
            <p className="text-sm text-gray-500">使用您的电子邮件和密码注册</p>
          </div>
          <Form
            emitsEmail={changeEmailHandle}
            emitsPassword={changePasswordHandle}
            emitsCode={changeCodeHandle}
          >
            <SubmitButton loading={timer} onSubmit={handleFormSubmit}>
              注册
            </SubmitButton>
            <p className="text-center text-sm text-gray-600">
              已有账户 &nbsp;
              <Link
                href="/login"
                replace={true}
                className="font-semibold text-gray-800"
              >
                登陆
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}
