export default async function HighlightsPage(){
  await new Promise((res) => {
    setTimeout(() => {
      res('ok');
    }, 2000);
  });
  return (
    <div>Highlights Page</div>
  )
}