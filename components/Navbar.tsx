import Link from "next/link";
import SignOutButton from "./Authentication/SignOut";
import { useUser } from "../hooks/useUser";

interface P {
  text?:string;
}
const Navbar: React.FC<P> = ({text}) => {
  const { name } = useUser();
  return (
      <div className="flex justify-between items-center p-2 border-b-2 border-gray-500">
        {name && !text && (
            <h1 className="text-2xl font-light">Hi <span className="text-green-500">{ name }</span></h1>
        )}
        { name && text && (
            <h1 className="text-2xl font-light text-green-500">{ text }</h1>
        )}
        <ul className="ml-8 list-disc">
          {!name && (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
          {!name && (
            <li>
              <Link href="/signup">
                <a>SignUp</a>
              </Link>
            </li>
          )}
        </ul>
      {name && <SignOutButton />}
      </div>
  );
};

export default Navbar;
