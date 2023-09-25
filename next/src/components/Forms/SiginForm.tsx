'use client';

import { FormEvent } from 'react';
import FloatingLabelInput from '../input/FloatingLabelInput';
import Link from 'next/link';

export default function SignInForm() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('ok');
  };
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <FloatingLabelInput id="identity" labelText="Username or email" />
      <FloatingLabelInput id="password" isPassword labelText="Password" />
      <div className="mt-4 flex items-center justify-between">
        <Link className="text-sm text-skin-fill hover:underline" href="/home">
          forgot password
        </Link>
        <button
          type="submit"
          disabled={false}
          className="h-[45px] self-end rounded-xl bg-skin-fill px-10 font-bold transition-[hover] duration-200 ease-linear hover:brightness-75 focus:ring-2 focus:ring-skin-base focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-transparent disabled:brightness-75"
        >
          Login
        </button>
      </div>
      <div className="mt-4 text-center text-sm">
        <span className="">
          Don&apos;t have an account ?
          <Link
            className="ml-2 text-sm text-skin-fill hover:underline"
            href="/home"
          >
            SignUp
          </Link>
        </span>
      </div>
    </form>
  );
}
