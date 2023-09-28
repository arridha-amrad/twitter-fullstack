import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { backgrounds, colors } from '@/components/Modals/DisplayModal/colors';

export const useReadTheme = () => {
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const bgFromCookie = Cookies.get('background');
    if (bgFromCookie) {
      const index = backgrounds.findIndex((data) =>
        data.class.toLowerCase().includes(bgFromCookie),
      );
      if (index >= 0) {
        setBgIndex(index);
      } else {
        setBgIndex(0);
      }
    }
    const colorFromCookie = Cookies.get('color');

    if (colorFromCookie) {
      const index = colors.findIndex((data) =>
        data.name.includes(colorFromCookie),
      );
      if (index >= 0) {
        setActiveColorIndex(index);
      } else {
        setActiveColorIndex(0);
      }
    }
  }, []);

  const setBackgroundColor = (index: number) => {
    setBgIndex(index);
    document.documentElement.classList.remove('dim', 'light-out');
    const bg = backgrounds[index].class;
    Cookies.set('background', bg, {
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      path: '/',
      expires: 365,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    document.documentElement.classList.add(bg);
  };

  const classColors = colors.map(({ name }) => name);

  const setColor = (index: number) => {
    setActiveColorIndex(index);
    document.documentElement.classList.remove(...classColors);
    const color = colors[index].name;
    document.documentElement.classList.add(color);
    Cookies.set('color', color, {
      domain: process.env.NEXT_PUBLIC_DOMAIN,
      path: '/',
      expires: 365,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  };

  return {
    setColor,
    setBackgroundColor,
    activeColorIndex,
    bgIndex,
  };
};
