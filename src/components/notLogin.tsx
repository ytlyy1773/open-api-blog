import Link from "next/link";
import { Button } from "antd";

export default function NotLogin() {
  return (
    <>
      <div className="w-full py-10 flex items-center justify-center">
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
