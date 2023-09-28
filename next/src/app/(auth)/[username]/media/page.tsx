export default async function MediaPage(){
  await new Promise((res) => {
    setTimeout(() => {
      res('ok');
    }, 2000);
  });
  return (
    <div>Media Page</div>
  )
}