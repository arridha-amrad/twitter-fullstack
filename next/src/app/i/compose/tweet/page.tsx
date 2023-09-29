import ComposeTweetModal from '@/components/Modals/ComposeTweetModal';
import Comp from './comp';
import { redirect } from 'next/navigation';

export default function ComposeTweetPage() {
  redirect ("/home?compose-tweet=true")
  // return (
  //   <>
  //     <ComposeTweetModal />
  //     <Comp/>
  //   </>
  // );
}
