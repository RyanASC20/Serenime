import Link from "next/link";
import SignOutButton from "./Authentication/SignOut";
import { useUser } from "../hooks/useUser";

const Navbar: React.FC = () => {
  const { user } = useUser();
  return (
    <div>
      <div className="ml-10 mt-10 flex-auto">
        <ul className="ml-8 list-disc">
          {!user && (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link href="/signup">
                <a>SignUp</a>
              </Link>
            </li>
          )}
        </ul>
      </div>
      {user && <SignOutButton />}
    </div>
  );
};

export default Navbar;
