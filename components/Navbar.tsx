import Link from "next/link";
import SignOutButton from "./Authentication/SignOut";
import { useUser } from "../hooks/useUser";

const Navbar: React.FC = () => {
  const { userData } = useUser();
  return (
      <div className="flex justify-between items-center">
        {userData && (
            <h1 className="text-2xl font-light">Hi <span className="text-green-600 font-bold">{ userData.name }</span></h1>
        )}
        <ul className="ml-8 list-disc">
          {!userData && (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
          {!userData && (
            <li>
              <Link href="/signup">
                <a>SignUp</a>
              </Link>
            </li>
          )}
        </ul>
      {userData && <SignOutButton />}

      </div>
  );
};

export default Navbar;
