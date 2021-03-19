import Link from "next/link";
import Fade from 'react-reveal/Fade';

import { useSidebarState } from "../hooks/useSidebar";
import { useUser } from "../hooks/useUser";
import SignOut from '../components/Authentication/SignOut';
import {HomeIconElement, WindIconElement, RoutineIconElement, StarIconElement} from '../public/static/icons';


const Sidebar: React.FC = () => {
        const { name } = useUser();
        const { sidebarOpen, setSidebarOpen } = useSidebarState();
        
        return (
            <>
            { sidebarOpen && window.innerWidth < 768 ? <Fade right duration={ 300 }>
                <div className={`transition-width duration-300 md:flex bg-base w-56 mb-10`}>
                    <div>
                    { name && <h1 className="text-2xl my-8">How are you, <span className="text-highlight">{ name }</span>?</h1> }
                        <ul className="text-gray-600" onClick={() => { setSidebarOpen(false) } }>
                            <li className="py-1.5 w-full transition duration-250 border-l-4 hover:border-highlight hover:bg-gray-300">
                                <Link href="/">
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
                        </ul>
                    </div>
                </div>
            </Fade> 
            :
            <>
            { sidebarOpen && <div className={`transition-width duration-300 md:flex bg-base w-56 h-screen`}>
                    <div>
                    { name && <h1 className="text-2xl my-8">How are you, <span className="text-highlight">{ name }</span>?</h1> }
                        <ul className="text-gray-600">
                            <li className="py-1.5 w-full transition duration-250 border-l-4 hover:border-highlight hover:bg-gray-300">
                                <Link href="/">
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
                        </ul>
                    </div>
                </div>}
            </>
            
        }
        </>
    );
};

export default Sidebar;
