import DisplayModal from '@/components/Modals/DisplayModal';
import { cookies } from 'next/headers';
import { findPage } from '../routes';

export default function DisplayPage() {
  const url = cookies().get('prev-url')?.value;
  const page = findPage(url ?? "")
  return (
    <>
      <DisplayModal />
      {page}
    </>
  );
}
