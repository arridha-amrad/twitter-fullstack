export default async function RepliesPage(){
  await new Promise((res) => {
    setTimeout(() => {
      res('ok');
    }, 2000);
  });
  return (
    <div>Replies Page</div>
  )
}