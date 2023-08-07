import ArrowLeft from '@heroicons/react/24/solid/ArrowLeftIcon';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate('/')}
      className="sticky top-0 z-10 flex w-full cursor-pointer items-center justify-start gap-3 border-b bg-slate-100 bg-opacity-30 px-6 py-3 backdrop-blur dark:border-b-slate-800 dark:bg-black dark:bg-opacity-20"
    >
      <ArrowLeft className="h-5 w-5" />
      <h1 className="text-lg font-semibold">Tweet</h1>
    </div>
  );
};

export default Navbar;
