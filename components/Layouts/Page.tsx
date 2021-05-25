import Head from 'next/head';

import {Navbar} from "../elements/Navbars";
import Sidebar from "../elements/Sidebar/Sidebar";
import Footer from '../elements/Footer';

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
            <div className="mb-20 md:mb-0">
                <Navbar />
                <div className="flex justify-center mx-2">
                    <div className="flex flex-col md:flex-row md:justify-between w-full lg:w-5/6 md:m-0">
                        <Sidebar />
                        {/* <div className={`${style ? style : 'flex flex-col md:flex-row md:justify-around w-full min-h-screen md:border-l-2 md:border-r-2 md:border-gray-300 md:px-3 md:py-6 bg-secondary'} `}> */}
                        <div className={style ? style : `flex flex-col md:flex-row md:justify-between w-full md:my-6 md:ml-5`}>
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
