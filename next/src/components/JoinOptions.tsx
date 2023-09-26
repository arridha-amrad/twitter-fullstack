"use client"

import {  useRouter } from "next/navigation";
import SignUpModal from "./Modals/SignupModal";
import SignInModal from "./Modals/SigninModal";

export default function JoinOptions() {
  const router = useRouter()


  return (
    <div className="flex flex-1 flex-shrink-0 items-center justify-center px-4 sm:px-0">
      <div className="item-center flex w-full flex-col justify-between gap-4 sm:w-2/3 lg:w-[90%]">
        <div className="block w-full lg:hidden">
          <div className="mx-auto aspect-square max-w-[60px] lg:w-full  ">
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-1nao33i r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"
            >
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
          </div>
        </div>

        <div className="mx-auto lg:mx-0 xl:mb-6">
          <h1 className="text-center text-5xl font-extrabold sm:text-start xl:text-6xl">
            Happening now
          </h1>
        </div>
        <h2 className="mb-2 text-center text-3xl font-bold lg:text-start">
          Join today.
        </h2>
        <div className="mx-auto flex max-w-[400px] flex-col gap-3 lg:mx-0 lg:w-[60%]">
          <button className="h-[45px] border w-full rounded-full bg-white font-bold text-black">
            Signup With Google
          </button>
          <button className="h-[45px] w-full border  rounded-full bg-white font-bold text-black">
            Signup With Facebook
          </button>
          <div className="relative my-3 w-full border-t">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-skin-base px-4">
              or
            </span>
          </div>
          <SignUpModal/>
          <div className="w-full leading-3">
            <small className="text-xs">
              By signing up, you agree to the <a className="text-blue-500 no-underline" href="https://twitter.com/id/tos">Terms of Service</a> and <a className="text-blue-500 no-underline" href="">Privacy
              Policy</a>, including<a className="text-blue-500 no-underline" href="https://help.twitter.com/id/rules-and-policies/x-cookies"> Cookie Use</a>.
            </small>
          </div>
          <h5 className="text-xl font-extrabold">Have an account?</h5>
          <SignInModal/>
        </div>
      </div>
    </div>
  );
}
