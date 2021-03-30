import Link from 'next/link';


const Navbar: React.FC = () => {
    return (
        <div className="flex justify-between sticky top-0 px-2 md:px-20 py-3 w-full bg-white z-50 ">
            <div className="flex items-center">
                <img src={require("../../public/static/imgs/favicon-32x32.png")} alt="logo" className="inline"></img>
                {/* <h1 className="inline text-2xl font-semibold font-sans text-white">Serenime</h1> */}
            </div>
            <div className="flex items-center">
                <Link href="/login">
                    <a className="transition duration-200 mr-2 md:mr-10 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-highlight text-white hover:opacity-50" href="#">Login</a>
                </Link>
                <Link href="/signup">
                    <a className="transition duration-200 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-highlight text-white hover:opacity-50" href="#">Sign Up</a>
                </Link>
            </div>
        </div>
    )
}

export default Navbar;