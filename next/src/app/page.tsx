import BigLogo from '../components/BigLogo';
import JoinOptions from '../components/JoinOptions';

const Page = async () => {
  return (
    <main className="container mx-auto">
      <div className="flex h-screen">
        <BigLogo />
        <JoinOptions/>
      </div>
    </main>
  );
};

export default Page;
