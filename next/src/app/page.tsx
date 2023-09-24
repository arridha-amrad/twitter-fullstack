const Page = () => {
  return (
    <main className="container mx-auto">
      <div className="flex h-screen">
        <div className="flex-1 hidden flex-shrink text-white h-full bg-green-500/30 xl:flex items-center justify-center">
          <div className="xl:h-[350px] aspect-square  ">
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
        <div className="flex-1 flex-shrink-0 bg-blue-500 flex items-center justify-center">
          <div className="xl:w-[80%] bg-pink-500/30 w-full h-2/3 flex flex-col justify-between">
            <div className="">
              <h1 className="font-extrabold xl:text-7xl text-5xl">
                Happening Now
              </h1>
            </div>
            <div className="gap-3 flex flex-col">
              <h2 className="font-bold text-3xl mb-2">Join now</h2>
              <button className="h-[45px] bg-white w-1/2 rounded-full text-black">
                Google button
              </button>
              <button className="h-[45px] bg-white w-1/2 rounded-full text-black">
                Facebook button
              </button>
              <div className="w-1/2 relative border-t my-3">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4">
                  or
                </span>
              </div>
              <button className="h-[45px] bg-white w-1/2 rounded-full text-black">
                Create Account
              </button>
              <div className="w-1/2 leading-3">
                <small className="text-xs">
                  Dengan mendaftar, Anda menyetujui Persyaratan Layanan dan
                  Kebijakan Privasi, termasuk Penggunaan Kuki.
                </small>
              </div>
            </div>
            <div className="">
              <h5 className="font-extrabold text-xl mb-4">Have an account?</h5>
              <button className="h-[45px] border bg-transparent rounded-full w-1/3">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
