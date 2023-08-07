import { FC } from "react";

const PostMedia: FC<{ urls: string[] }> = ({ urls }) => {
  return (
    <>
      {urls.length === 1 && (
        <ul
          v-show="urls.length === 1"
          className="my-4 box-border grid grid-cols-1 grid-rows-1"
        >
          {urls.map((url, i) => (
            <li key={i}>
              <img
                className="object-cover object-center w-auto h-full rounded-lg"
                src={url}
                alt="medias"
              />
            </li>
          ))}
        </ul>
      )}

      {urls.length === 2 && (
        <ul className="my-4 box-border grid grid-cols-2 grid-rows-2 gap-2">
          {urls.map((url, i) => (
            <li className="col-span-1 row-span-2" key={i}>
              <img
                className="object-cover object-center w-auto h-full rounded-lg"
                src={url}
                alt="medias"
              />
            </li>
          ))}
        </ul>
      )}

      {urls.length === 3 && (
        <ul className="my-4 box-border grid grid-cols-2 grid-rows-2 gap-2">
          {urls.map((url, i) => (
            <li className="col-span-1 row-span-2" key={i}>
              <img
                className="object-cover object-center w-auto h-full rounded-lg"
                src={url}
                alt="medias"
              />
            </li>
          ))}
        </ul>
      )}

      {urls.length === 4 && (
        <ul className="my-4 box-border grid grid-cols-2 grid-rows-2 gap-2">
          {urls.map((url, i) => (
            <li className="col-span-1 row-span-1" key={i}>
              <img
                className="object-cover object-center w-auto h-full rounded-lg"
                src={url}
                alt="medias"
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PostMedia;
