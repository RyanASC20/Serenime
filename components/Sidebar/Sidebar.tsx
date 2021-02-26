import Link from "next/link";
import styles from "./Sidebar.module.css";
import {HomeIconElement, WindIconElement, RoutineIconElement} from '../../public/static/icons';

const Sidebar: React.FC = () => {
    return (
        <div className={styles.container}>
            <div>
                <h1 className={styles.title}>Serenime</h1>
                <ul className={styles.navigation}>
                    <li>
                        <Link href="/">
                            <a>{ HomeIconElement }Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/breathing">
                            <a>{ WindIconElement }Breathing</a>
                        </Link>
                    </li>
                    <li>
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
