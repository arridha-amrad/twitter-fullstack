import { Metadata } from 'next';

type Props = {
  params: {
    username: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fullname = 'Arridha Amrad';
  return {
    title: `Media posts by ${fullname} (@${params.username}) / X`,
  };
}

export default async function MediaPage() {
  return <div>Media Page</div>;
}
