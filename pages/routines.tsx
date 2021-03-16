import { useEffect, useState } from 'react';

import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Routine from '../components/Routines/Routine';
import { useUser } from '../hooks/useUser';

const Routines: React.FC = () => {
    const { uid } = useUser();

    return (
        <>
            <Head>
                <title>Serenime | Home</title>
            </Head>
            {uid && (
                <div className="bg-base">
                    <Navbar />
                    <div className="flex justify-center mx-2">
                        <div className="flex flex-col md:flex-row md:justify-between w-full lg:w-3/4 md:m-0">
                            <Sidebar />
                            <div className="w-full h-screen md:border-l-2 md:border-r-2 md:border-gray-300 md:px-3 md:py-6 bg-white">
                                <div>
                                    <div className="mb-4 p-3 rounded-lg ">
                                        <h1 className="text-highlight font-bold">
                                            Morning and Evening Routines
                                        </h1>
                                        <p>
                                            Here's a checklist of things you can do when you wake up or go before you sleep.
                                            As the deadline approaches, the item will turn from green (90 min), to orange (60 min), to yellow (30 min), and to red(less than 30 min)
                                        </p>
                                        <p>Click on each item to toggle if you have completed them or not.</p>

                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row md:justify-around">
                                    <div className="w-full mb-8 md:mb-0 md:w-2/5">
                                        <h1 className="text-2xl text-center mb-2">Morning</h1>
                                        <Routine timePeriod="morning" />
                                    </div>
                                    <div className="w-full md:w-2/5">
                                        <h1 className="text-2xl text-center mb-2">Evening</h1>
                                        <Routine timePeriod="night" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Routines;