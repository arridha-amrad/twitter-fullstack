import { Fragment } from "react";
import TextLink from "../components/TextLink";
import SwitchThemeFeature from "../features/ChangeThemeFeature/SwitchThemeV1";
import RegisterFeature from "../features/RegisterFeature";
import Seo from "../components/Seo";

const RegisterPage = () => {
  return (
    <Fragment>
      <Seo
        title="Register / Twitter-Clone"
        description="register page of twitter clone"
      />
      <main className="container mx-auto">
        <div className="flex items-center justify-end w-full h-14">
          <SwitchThemeFeature />
        </div>
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md border rounded-lg space-y-5 md:bg-white md:dark:bg-black md:py-8 md:px-12 dark:border-slate-700">
            <div className="flex items-center justify-center mb-4 gap-4">
              <img
                className="hidden w-12 h-12 dark:block"
                src={`${import.meta.env.VITE_CLIENT_BASE_URL}/logo-dark.svg`}
                alt="logo"
              />
              <img
                className="block w-12 h-12 dark:hidden"
                src={`${import.meta.env.VITE_CLIENT_BASE_URL}/logo-light.svg`}
                alt="logo"
              />
              <h1 className="text-2xl font-bold">Register</h1>
            </div>

            <RegisterFeature />
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default RegisterPage;
