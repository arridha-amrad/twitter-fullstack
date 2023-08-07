import TextLink from "../components/TextLink";
import LoginFeature from "../features/LoginFeature";
import SwitchThemeFeature from "../features/ChangeThemeFeature/SwitchThemeV1";
import { Fragment } from "react";
import Seo from "../components/Seo";

const LoginPage = () => {
  return (
    <Fragment>
      <Seo
        title="Login / Twitter-Clone"
        description="The login page of twitter clone"
      />
      <main className="container mx-auto">
        <div className="flex items-center justify-end w-full h-14">
          <SwitchThemeFeature />
        </div>
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-[500px] space-y-5 md:bg-white md:dark:bg-black md:py-16 md:px-12 rounded-lg">
            <h1 className="text-3xl font-bold">Twitter</h1>
            <LoginFeature />
            <div className="flex justify-between">
              <TextLink to="/forgot-password">forgot password</TextLink>
              <TextLink to="/register">Register</TextLink>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default LoginPage;
