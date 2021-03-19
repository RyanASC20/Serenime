import Link from "next/link";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
// import styles from "./Sidebar.module.css";
import {HomeIconElement, WindIconElement, RoutineIconElement, StarIconElement} from '../public/static/icons';

// @refresh reset

const Sidebar: React.FC = () => {
        const { name } = useUser();
        return (
        <div className="md:flex hidden w-56 h-3/4">
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
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
