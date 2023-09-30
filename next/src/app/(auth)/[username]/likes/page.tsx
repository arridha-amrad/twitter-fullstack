import { Metadata } from "next"

type Props = {
  params: {
    username: string
  }
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const fullname = "Arridha Amrad"
  return {
    title: `Posts liked by ${fullname} (@${params.username}) / X`
  }
}

export default async function LikePage(){
  return (
    <div>Like Page</div>
  )
}