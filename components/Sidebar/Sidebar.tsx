import Link from "next/link";
// import styles from "./Sidebar.module.css";
import {HomeIconElement, WindIconElement, RoutineIconElement} from '../../public/static/icons';

// @refresh reset

const Sidebar: React.FC = () => {
    // return (
    //     <div className={styles.container}>
    //         <div>
    //             <h1 className={styles.title}>Serenime</h1>
    //             <ul className={styles.navigation}>
    //                 <li>
    //                     <Link href="/">
    //                         <a>{ HomeIconElement }Home</a>
    //                     </Link>
    //                 </li>
    //                 <li>
    //                     <Link href="/breathing">
    //                         <a>{ WindIconElement }Breathing</a>
    //                     </Link>
    //                 </li>
    //                 <li>
    //                     <Link href="/routines">
    //                         <a>{RoutineIconElement}Routines</a>
    //                     </Link>
    //                 </li>
    //             </ul>
    //         </div>
    //     </div>
    // );
        return (
        <div className="md:flex hidden w-56 justify-center  h-screen bg-sidebar-bg">
            <div>
                <h1 className="text-sidebar-text-green text-2xl my-12">Serenime</h1>
                <ul className="text-sidebar-text">
                    <li className="my-3 transition duration-250 hover:text-sidebar-text-green">
                        <Link href="/">
                            <a>{ HomeIconElement }Home</a>
                        </Link>
                    </li>
                    <li className="my-3 transition duration-250 hover:text-sidebar-text-green">
                        <Link href="/breathing">
                            <a>{ WindIconElement }Breathing</a>
                        </Link>
                    </li>
                    <li className="my-3 transition duration-250 hover:text-sidebar-text-green">
                        <Link href="/routines">
                            <a>{RoutineIconElement}Routines</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
