import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const TweetParentsAuthor: FC<{ tweet: Tweet }> = ({ tweet }) => {
  const navigate = useNavigate();
  const authors: string[] = [];
  const setParent = (tweet?: Tweet) => {
    if (!tweet) return;
    const author = tweet.user.username;
    if (authors.findIndex((user) => user === author) < 0) {
      authors.push(tweet.user.username);
    }
    if (tweet.parent) {
      setParent(tweet.parent);
    }
  };
  setParent(tweet.parent);

  if (authors.length === 0) return null;

  return (
    <ul className="m-0 flex flex-wrap gap-1 p-0 text-sm text-blue-500 dark:text-blue-300">
      Replying to
      {authors.map((author, i) => (
        <li
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile/${author}`);
          }}
          key={i}
        >
          {authors.length > 1 && i + 1 === authors.length ? (
            <span>
              and <span className="hover:underline">@{author}</span>
              {i + 1 === authors.length && <span>.</span>}
            </span>
          ) : (
            <span className="hover:underline">
              @{author}
              {i + 1 === authors.length ? (
                <span>.</span>
              ) : (
                i + 2 !== authors.length && <span>,</span>
              )}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TweetParentsAuthor;
