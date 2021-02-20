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
    <button onClick={handleSignOut} className="p-2 bg-gray-300">
      Sign Out
    </button>
  );
};

export default SignOutButton;
