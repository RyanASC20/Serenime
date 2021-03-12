import Button from '../Button';
import { auth } from "../../config/firebase";

const SignOutButton: React.FC = () => {
  const handleSignOut = async () => {
    try {
      return await auth.signOut();
    } catch (err) {
      return err;
    }
  };

  return (
    <Button onClick={handleSignOut} text="Sign Out" textSize="md" />
  );
};

export default SignOutButton;
