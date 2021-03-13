import Link from "next/link";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
// import styles from "./Sidebar.module.css";
import {HomeIconElement, WindIconElement, RoutineIconElement} from '../public/static/icons';

// @refresh reset

const Sidebar: React.FC = () => {
        const { name } = useUser();
        return (
        <div className="md:flex hidden w-56 h-3/4">
            <div>
            { name && <h1 className="text-2xl my-8">How are you, <span className="text-highlight">{ name }</span>?</h1> }
                <ul className="text-gray-600">
                    <li className="my-3 transition duration-250 hover:text-sidebar-text-green">
                        <Link href="/">
                            <a className="text-lg p-3 border-l-2 hover:border-highlight hover:bg-white">{ HomeIconElement }Home</a>
                        </Link>
                    </li>
                    {/* <li className="my-3 transition duration-250 hover:text-sidebar-text-green">
                        <Link href="/habits">
                            <a>{RoutineIconElement}Habits</a>
                        </Link>
                    </li> */}
                    <li className="my-3 transition duration-250 hover:text-sidebar-text-green">
                        <Link href="/breathing">
                            <a className="text-lg p-3 border-l-2 hover:border-highlight hover:bg-white">{ WindIconElement }Breathing</a>
                        </Link>
                    </li>
                    <li className="my-3 transition duration-250 hover:text-sidebar-text-green">
                        <Link href="/routines">
                            <a className="text-lg p-3 border-l-2 hover:border-highlight hover:bg-white">{RoutineIconElement}Routines</a>
                        </Link>
                    </li>
                    <li className="my-3 transition duration-250 hover:text-sidebar-text-green">
                        <Link href="/habits">
                            <a className="text-lg p-3 border-l-2 hover:border-highlight hover:bg-white">{RoutineIconElement}Habits</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
