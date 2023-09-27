'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    return () => {
      const url = `${pathname}`;
      const urlArr = url.split('/');
      if (!urlArr.includes('i')) {
        Cookies.set('prev-url', url, { domain: 'localhost', path: '/' });
      }
    };
  }, [pathname, searchParams]);

  return null;
}
