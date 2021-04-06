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
        <section className="transform -skew-y-12 md:-skew-y-6 relative -top-24 flex justify-center w-full h-full bg-gradient-to-br from-highlight to-highlight-secondary text-white">
            <h1 className={`transform skew-y-12 md:skew-y-6 absolute top-36 md:top-48 text-6xl md:text-9xl`}>Serenime</h1>
            <h1 className={`${styles.jumbotron} transform skew-y-12 md:skew-y-6 absolute top-64 md:top-1/2 text-3xl md:text-5xl`}>{options[jumbotronPos]}</h1>
        </section>
    )
}

export default Jumbotron;