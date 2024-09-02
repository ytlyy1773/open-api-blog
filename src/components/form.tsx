import React from "react";

export function Form({
  children,
  emitsEmail,
  emitsPassword,
}: {
  children: React.ReactNode;
  emitsEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emitsPassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          电子邮件
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="openapijs@163.com"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          onChange={emitsEmail}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          密码
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="含字母和数字不低于8位数字"
          required
          onChange={emitsPassword}
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      {children}
    </form>
  );
}
