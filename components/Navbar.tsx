import Link from "next/link";
import SignOutButton from "./Authentication/SignOut";
import { useUser } from "../hooks/useUser";

interface P {
  text?: string;
}
const Navbar: React.FC<P> = ({ text }) => {
  const { name } = useUser();
  return (
    <div className="flex justify-center p-2 shadow-md bg-red-400 mb-2">
      <div className="flex items-center justify-between w-5/6 lg:w-3/4">
        <Link href="/">
            <h1 className="text-white font-serif tracking-wider bg-highlight-pink text-2xl cursor-pointer">Serenime</h1>
        </Link>
        {/* {name && !text && (
            <h1 className="text-2xl font-light">Hi <span className="text-green-500">{ name }</span></h1>
        )}
        { name && text && (
            <h1 className="text-2xl font-light text-green-500">{ text }</h1>
        )} */}
        {name && <SignOutButton />}
      </div>
    </div>
  );
};

export default Navbar;
