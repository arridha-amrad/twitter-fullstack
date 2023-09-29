import { Markup } from 'interweave';

import { polyfill } from 'interweave-ssr';
import { data } from './string';

polyfill();

export default function Comp() {
  const articleContent = '<div>Hello World</div>';
  return (
    <>
      <Markup className="z-50 text-white" content={data} />
    </>
  );
}
