import { FC, useState } from "react";
import ModalCarousel from "./ModalCarousel";

const TweetImagePreview: FC<{ urls: string[] }> = ({ urls }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ModalCarousel setIsOpen={setIsOpen} isOpen={isOpen} images={urls}>
      <ul
        onClick={() => setIsOpen(true)}
        className="flex px-3 cursor-pointer -space-x-2"
      >
        {urls.map((url, i) => (
          <li key={i}>
            <img
              src={url}
              className="object-cover w-8 h-8 rounded-full"
              alt="avatar"
            />
          </li>
        ))}
      </ul>
    </ModalCarousel>
  );
};

export default TweetImagePreview;
