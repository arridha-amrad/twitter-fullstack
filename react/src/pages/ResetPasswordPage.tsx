import TextLink from "../components/TextLink";
import ResetPasswordFeature from "../features/ResetPasswordFeature";

const ResetPasswordPage = () => {
  return (
    <main className="container mx-auto">
      <div className="flex items-center justify-center h-screen p-6 md:p-12">
        <div className="w-full max-w-[500px] space-y-5 md:bg-white md:dark:bg-black md:py-16 md:px-12 rounded-lg">
          <h1 className="text-3xl font-bold">Twitter</h1>
          <ResetPasswordFeature />
          <div className="flex justify-center">
            <span>
              Back to <TextLink to="/login">login</TextLink>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordPage;
