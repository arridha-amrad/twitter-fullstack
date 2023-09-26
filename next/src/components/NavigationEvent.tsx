'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    // const urlArr = url.split('/');
    // if (urlArr.includes('i') && from !== url) {
    //   localStorage.setItem('prevUrl', from);
    // }
    console.log('mounted url : ', url);
    return () => {
      const url = `${pathname}?${searchParams}`;
      const urlArr = url.split('/');
      if (!urlArr.includes('i')) {
        localStorage.setItem('prevUrl', url);
      }
      console.log('unmounted url : ', url);
    };
  }, [pathname, searchParams]);

  return null;
}
