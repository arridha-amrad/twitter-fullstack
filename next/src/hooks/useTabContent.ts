import { useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export default function useTabContent(contents: ReactNode[]) {
  const [content, setContent] = useState<ReactNode>(null);
  const params = useSearchParams();
  const paramTab = params.get('tab');

  useEffect(() => {
    if (paramTab === null) {
      const savedTab = sessionStorage.getItem('home-tab') ?? 'for-you';
      setContent(savedTab === 'for-you' ? children : followingTweets);
    } else {
      setContent(paramTab === 'for-you' ? children : followingTweets);
    }
    // eslint-disable-next-line
  }, [paramTab]);
}
