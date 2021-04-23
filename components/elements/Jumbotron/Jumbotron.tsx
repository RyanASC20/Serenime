import { useState, useEffect } from 'react';
import styles from "./Jumbotron.module.css";

const Jumbotron: React.FC = () => {
    const options = ['Breathe.', 'Plan your day.', 'Record your goals.', 'Visualize your mood.'];
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
        <h1 className={`${styles.jumbotron} transform text-3xl md:text-5xl`}>{options[jumbotronPos]}</h1>
    )
}

export default Jumbotron;