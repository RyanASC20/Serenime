import Link from "next/link";
import { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';

import { useSidebarState } from "../../context/useSidebar";
import { useUser } from "../../context/useUser";
import SignOut from '../auth/SignOut';
import {HomeIconElement, WindIconElement, RoutineIconElement, StarIconElement} from '../../public/static/icons';


const Sidebar: React.FC = () => {
        const { name } = useUser();
        const { sidebarOpen, setSidebarOpen, windowWidth } = useSidebarState();
        
        return (
            <>
            { sidebarOpen && windowWidth < 768 ? <Fade right duration={ 300 }>
                <div className={`transition-width duration-300 md:flex bg-base w-56 mb-10`}>
                    <div>
                    { name && <h1 className="text-2xl my-4">How are you, <span className="text-highlight">{ name }</span>?</h1> }
                        <ul className="text-gray-600" onClick={() => { setSidebarOpen(false) } }>
                            <li className="py-1.5 w-full transition duration-250 border-l-4 hover:border-highlight hover:bg-gray-300">
                                <Link href="/home">
                                    <a className="text-lg p-3">{ HomeIconElement }Home</a>
                                </Link>
                            </li>
                            <li className="py-1.5 w-full transition duration-250 border-l-4 hover:border-highlight hover:bg-gray-300">
                                <Link href="/breathing">
                                    <a className="text-lg p-3">{ WindIconElement }Breathing</a>
                                </Link>
                            </li>
                            <li className="py-1.5 w-full transition duration-250 border-l-4 hover:border-highlight hover:bg-gray-300">
                                <Link href="/goals">
                                    <a className="text-lg p-3">{StarIconElement}Goals</a>
                                </Link>
                            </li>
                            <li className="py-1.5 w-full transition duration-250 border-l-4 hover:border-highlight hover:bg-gray-300">
                                <Link href="/routines">
                                    <a className="text-lg p-3">{RoutineIconElement}Routines</a>
                                </Link>
                            </li>
                            <li className="mt-5 w-full">
                                <SignOut />
                            </li>
                            <li>
                                <a href="#" className="underline text-gray-500">Feedback?</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Fade> 
            :
            <>
            { sidebarOpen && <div className={`transition-width duration-300 md:flex w-48 h-screen`}>
                    <div>
                    { name && <h1 className="text-xl my-8">How are you, <span className="text-highlight">{ name }</span>?</h1> }
                        <ul className="text-gray-600">
                            <li className="py-1.5 w-full transition duration-250 border-l-4 hover:border-highlight hover:bg-gray-300">
                                <Link href="/home">
                                    <a className="text-md p-3">{ HomeIconElement }Home</a>
                                </Link>
                            </li>
                            <li className="py-1.5 w-full transition duration-250 border-l-4 hover:border-highlight hover:bg-gray-300">
                                <Link href="/breathing">
                                    <a className="text-md p-3">{ WindIconElement }Breathing</a>
                                </Link>
                            </li>
                            <li className="py-1.5 w-full transition duration-250 border-l-4 hover:border-highlight hover:bg-gray-300">
                                <Link href="/goals">
                                    <a className="text-md p-3">{StarIconElement}Goals</a>
                                </Link>
                            </li>
                            <li className="py-1.5 w-full transition duration-250 border-l-4 hover:border-highlight hover:bg-gray-300">
                                <Link href="/routines">
                                    <a className="text-md p-3">{RoutineIconElement}Routines</a>
                                </Link>
                            </li>
                            <li className="mt-3">
                                <p className="text-gray-500 text-xs">Feedback? Contact <a href="mailto:serenimeapp@gmail.com" className="underline">serenimeapp@gmail.com</a></p>
                            </li>
                        </ul>
                    </div>
                </div>}
            </>
            
        }
        </>
    );
};

export default Sidebar;
