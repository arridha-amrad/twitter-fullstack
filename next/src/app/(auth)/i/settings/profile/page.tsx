import SettingsProfileModal from '@/components/Modals/SettingsProfileModal';
import { cookies } from 'next/headers';
import { findPage } from '../../routes';

export default function SettingsProfilePage() {
  const url = cookies().get('prev-url')?.value;
  const page = findPage(url ?? "")
  return (
    <>
      <SettingsProfileModal />
      {page}
    </>
  );
}
