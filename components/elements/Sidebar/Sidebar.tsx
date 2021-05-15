import Link from "next/link";
import Fade from 'react-reveal/Fade';

import SidebarItem from "./SidebarItem";
import { useSidebarState } from "../../../context/useSidebar";
import { useUser } from "../../../context/useUser";
import SignOut from '../../auth/SignOut';
import {HomeIconElement, WindIconElement, RoutineIconElement, StarIconElement, ImageIconElement} from '../../../icons';


const Sidebar: React.FC = () => {
        const { name } = useUser();
        const { sidebarOpen, setSidebarOpen, windowWidth } = useSidebarState();
        
        return (
            <>
            { sidebarOpen && windowWidth < 768 ? <Fade right duration={ 300 }>
                <div className={`transition-width duration-300 md:flex bg-base w-56 mb-10`}>
                    <div>
                    { name && <h1 className="text-xl my-4">How are you, <span className="text-highlight">{ name }</span>?</h1> }
                        <ul className="text-gray-600" onClick={() => { setSidebarOpen(false) } }>
                            <SidebarItem urlTarget="home">{ HomeIconElement } Home</SidebarItem>
                            <SidebarItem urlTarget="breathing">{ WindIconElement } Breathing</SidebarItem>
                            <SidebarItem urlTarget="goals">{ StarIconElement } Goals</SidebarItem>
                            <SidebarItem urlTarget="routines">{ RoutineIconElement } Routines</SidebarItem>
                            <SidebarItem urlTarget="picture">{ ImageIconElement } Picture</SidebarItem>
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
                            <SidebarItem urlTarget="home">{ HomeIconElement } Home</SidebarItem>
                            <SidebarItem urlTarget="breathing">{ WindIconElement } Breathing</SidebarItem>
                            <SidebarItem urlTarget="goals">{ StarIconElement } Goals</SidebarItem>
                            <SidebarItem urlTarget="routines">{ RoutineIconElement } Routines</SidebarItem>
                            <SidebarItem urlTarget="picture">{ ImageIconElement } Picture</SidebarItem>
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
