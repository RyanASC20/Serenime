import { useRouter } from 'next/router';
import Button from '../Button';
import { auth } from "../../config/firebase";

const SignOutButton: React.FC = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push("/login");
      return;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button onClick={handleSignOut} text="Sign Out" textSize="md" />
  );
};

export default SignOutButton;
