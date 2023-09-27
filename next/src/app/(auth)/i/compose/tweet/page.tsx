import ComposeTweetModal from '@/components/Modals/ComposeTweetModal';
import { cookies } from 'next/headers';
import { findPage } from '../../routes';

export default function ComposeTweetPage() {
  const url = cookies().get('prev-url')?.value;
  const page = findPage(url ?? "")
  return (
    <>
      <ComposeTweetModal />
      {page}
    </>
  );
}
