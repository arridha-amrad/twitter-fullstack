import LayoutRight from '../RightBar';

export default async function ExplorePage() {
  return (
    <>
      <main className="min-h-screen w-full max-w-[598px] overflow-x-clip border-x border-skin-base">
        <div className="sticky top-0 z-10 flex h-28 flex-col backdrop-blur">
          <div className="z-10 flex flex-1 items-center px-5 text-xl font-semibold">
            Explore
          </div>
        </div>
      </main>
      <LayoutRight>
        <div className="mt-2 flex flex-col gap-4">
          <h1>Explore Right bar</h1>
        </div>
      </LayoutRight>
    </>
  );
}
