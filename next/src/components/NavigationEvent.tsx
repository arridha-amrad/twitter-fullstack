'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    return () => {
      const url = `${pathname}`;
      const urlArr = url.split('/');
      const el = document.getElementById("main-layout")
      console.log({el})
    };
  }, [pathname, searchParams]);

  return null;
}
