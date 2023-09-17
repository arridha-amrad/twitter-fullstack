import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const username = params.username

  return {
    title: `${username} / X`,
  }
}

export const metadata: Metadata = {
  title: 'Profile / X',
}

const ProfilePage = ({ params, searchParams }: Props) => {
  return <div>ProfilePage of {params.username}</div>;
}

export default ProfilePage;