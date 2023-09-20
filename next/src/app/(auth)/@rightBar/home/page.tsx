import Footer from "../../../components/footer";
import TrendsCard from "../components/TrendsCard";
import UserToFollowCard from "../components/UserToFollow";
import VerificationCard from "../components/VerificationCard";

export default function Page() {
  return (
    <div className="mt-2 flex flex-col gap-4">
      <VerificationCard />
      <TrendsCard />
      <UserToFollowCard />
      <Footer />
    </div>
  );
}
