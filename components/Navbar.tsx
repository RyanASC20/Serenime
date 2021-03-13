import Link from "next/link";
import SignOutButton from "./Authentication/SignOut";
import { useUser } from "../hooks/useUser";

interface P {
  text?: string;
}
const Navbar: React.FC<P> = ({ text }) => {
  const { name } = useUser();
  return (
    <div className="flex justify-center p-2 shadow-md bg-red-400 mb-2 sticky top-0">
      <div className="flex items-center justify-between w-5/6 md:w-2/3">
        <Link href="/">
            <h1 className="text-white bg-highlight-pink text-2xl cursor-pointer">Serenime</h1>
        </Link>
        {/* {name && !text && (
            <h1 className="text-2xl font-light">Hi <span className="text-green-500">{ name }</span></h1>
        )}
        { name && text && (
            <h1 className="text-2xl font-light text-green-500">{ text }</h1>
        )} */}
        {!name && <ul className="ml-8 list-disc">
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <a>SignUp</a>
            </Link>
          </li>
        </ul>}
        {name && <SignOutButton />}
      </div>
    </div>
  );
};

export default Navbar;
