export default async function LikePage(){
  await new Promise((res) => {
    setTimeout(() => {
      res('ok');
    }, 2000);
  });
  return (
    <div>Like Page</div>
  )
}