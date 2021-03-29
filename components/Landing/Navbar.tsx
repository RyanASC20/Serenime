import Link from 'next/link';


const Navbar: React.FC = () => {
    return (
        <div className="flex justify-between sticky top-0 px-2 md:px-20 py-3 w-full bg-white z-50 ">
            <div className="flex items-center">
                <img src={require("../../public/static/imgs/favicon-32x32.png")} alt="logo" className="inline"></img>
                <h1 className="inline text-3xl font-bold font-sans">erenime</h1>
            </div>
            <div className="flex items-center">
                <Link href="/login">
                    <a className="transition duration-200 mr-2 md:mr-10 px-3 py-1.5 md:px-6 md:py-3 rounded-md bg-highlight text-white hover:bg-highlight-secondary" href="#">Login</a>
                </Link>
                <Link href="/signup">
                    <a className="transition duration-200 px-3 py-1.5 md:px-6 md:py-3 rounded-md bg-highlight text-white hover:bg-highlight-secondary" href="#">Sign Up</a>
                </Link>
            </div>
        </div>
    )
}

export default Navbar;