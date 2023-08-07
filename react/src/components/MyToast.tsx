import { Toaster } from 'react-hot-toast';

const MyToast = () => {
  return (
    <Toaster
      toastOptions={{
        success: {
          icon: (
            <img
              className="w-6 h-6"
              src={`${import.meta.env.VITE_CLIENT_BASE_URL}/twitter.svg`}
            />
          )
        },
        position: 'bottom-center',
        className:
          'dark:bg-blue-800 text-sm font-semibold dark:text-white bg-blue-300 text-slate-800'
      }}
    />
  );
};

export default MyToast;
