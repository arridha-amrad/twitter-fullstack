import { FC, ImgHTMLAttributes } from 'react';

const Spinner: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return (
    <img
      {...props}
      className={props.className}
      src="http://localhost:3000/spinner.svg"
      alt="spinner"
    />
  );
};

export default Spinner;

