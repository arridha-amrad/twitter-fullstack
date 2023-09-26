'use client';

import { useEffect, useState } from 'react';
import ExplorePageCompositions from '../../explore/compositions';
import HomePageCompositions from '../../home/compositions';

const DisplayPageComponent = () => {
  const [prev, setPrev] = useState('');

  useEffect(() => {
    const url = localStorage.getItem('prevUrl');
    setPrev(url ?? '/home?');
  }, []);

  switch (prev) {
    case '/home?':
      return <HomePageCompositions />;
    case '/explore?':
      return <ExplorePageCompositions />;
    default:
      return null;
  }
};

export default DisplayPageComponent;
