import Link from "next/link";
import SignOutButton from "./Authentication/SignOut";
import { useUser } from "../hooks/useUser";

interface P {
  text?:string;
}
const Navbar: React.FC<P> = ({text}) => {
  const { userData } = useUser();
  return (
      <div className="flex justify-between items-center p-5 border-b-2 border-gray-500">
        {userData && !text && (
            <h1 className="text-2xl">Hi <span className="text-green-500">{ userData.name }</span></h1>
        )}
        { userData && text && (
            <h1 className="text-2xl font-light text-green-500">{ text }</h1>
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
