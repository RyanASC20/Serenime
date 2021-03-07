import Link from "next/link";
// import styles from "./Sidebar.module.css";
import {HomeIconElement, WindIconElement, RoutineIconElement} from '../public/static/icons';

// @refresh reset

const Sidebar: React.FC = () => {
        return (
        <div className="md:flex hidden w-56 justify-center h-screen bg-sidebar-bg">
            <div>
                <h1 className="text-sidebar-text-green text-2xl my-12">Serenime</h1>
                <ul className="text-sidebar-text">
                    <li className="my-3 transition duration-250 hover:text-sidebar-text-green">
                        <Link href="/">
                            <a className="text-lg">{ HomeIconElement }Home</a>
                        </Link>
                    </li>
                    {/* <li className="my-3 transition duration-250 hover:text-sidebar-text-green">
                        <Link href="/habits">
                            <a>{RoutineIconElement}Habits</a>
                        </Link>
                    </li> */}
                    <li className="my-3 transition duration-250 hover:text-sidebar-text-green">
                        <Link href="/breathing">
                            <a className="text-lg">{ WindIconElement }Breathing</a>
                        </Link>
                    </li>
                    <li className="my-3 transition duration-250 hover:text-sidebar-text-green">
                        <Link href="/routines">
                            <a className="text-lg">{RoutineIconElement}Routines</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
