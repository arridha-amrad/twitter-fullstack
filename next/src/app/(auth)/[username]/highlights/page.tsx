import { Metadata } from "next";

type Props = {
  params: {
    username: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fullname = 'Arridha Amrad';
  return {
    title: `${fullname} (@${params.username}) / X`,
  };
}

export default async function HighlightsPage(){
  return (
    <div>Highlights Page</div>
  )
}