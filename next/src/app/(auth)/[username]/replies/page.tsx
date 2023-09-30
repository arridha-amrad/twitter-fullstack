import { Metadata } from "next"

type Props = {
  params: {
    username: string
  }
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const fullname = "Arridha Amrad"
  return {
    title: `Posts with replies by ${fullname} (@${params.username}) / X`
  }
}

export default async function RepliesPage(){
  return (
    <div>Replies Page</div>
  )
}