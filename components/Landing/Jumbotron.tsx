import { useState, useEffect } from 'react';
import styles from "./Jumbotron.module.css";

const Jumbotron: React.FC = () => {
    const options = ['Mood Tracker.', 'Goal Tracker.', 'Guided Breathing.', 'Planner.'];
    const [jumbotronPos, setJumbotronPos] = useState(0);

    useEffect(() => {
        let count = 0;
        const interval = setInterval(() => {
            setJumbotronPos(count);
            count++;
            count %= options.length;
        }, 4000)
        return () => { clearInterval(interval) }
    }, [])

    return (
        <section className="absolute">
            <h1 className={`${styles.jumbotron} text-5xl md:text-9xl text-white`}>{options[jumbotronPos]}</h1>
        </section>
    )
}

export default Jumbotron;