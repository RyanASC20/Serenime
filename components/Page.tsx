import Head from 'next/head';

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from './Footer';

interface P {
    title: string;
    style?: string;
}

const Page: React.FC<P> = ({ children, title, style }) => {
    return (
        <>
            <Head>
                <title>Serenime | { title }</title>
            </Head>
            <div className="bg-base mb-20 md:mb-0">
                <Navbar />
                <div className="flex justify-center mx-2">
                    <div className="flex flex-col md:flex-row md:justify-between w-full lg:w-3/4 md:m-0">
                        <Sidebar />
                        <div className={`${style ? style : 'flex flex-col md:flex-row md:justify-around w-full h-screen md:border-l-2 md:border-r-2 md:border-gray-300 md:px-3 md:py-6 bg-secondary'} `}>
                            { children }
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default Page;
