import { Metadata } from 'next';
import HomePageCompositions from './compositions';

export const metadata: Metadata = {
  title: 'Home / X',
};

export default async function HomePage() {
  return <HomePageCompositions />;
}
