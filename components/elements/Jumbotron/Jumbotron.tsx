import { useState, useEffect } from 'react';
import styles from "./Jumbotron.module.css";

const Jumbotron: React.FC = () => {
    const options = ['Breathe.', 'Plan your day.', 'Record your goals.', 'Visualize your mood.'];
    const [jumbotronPos, setJumbotronPos] = useState(0);

    // useEffect(() => {
    //     let count = 0;
    //     const interval = setInterval(() => {
    //         setJumbotronPos(count);
    //         count++;
    //         count %= options.length;
    //     }, 4000)
    //     return () => { clearInterval(interval) }
    // }, [])

    return (
        // <h1 className={`${styles.jumbotron} flex items-center h-96 text-3xl md:text-9xl`}>{options[jumbotronPos]}</h1>
        <div className="text-center">
            <h1 className="my-10 text-4xl md:text-6xl text-gray-700 font-bold">Reduce stress. Track your life.</h1>
            <h2 className="text-xl md:text-2xl text-gray-500">One site to visualize your mood, complete breathing exercises, record your goals, and more.</h2>
        </div>
    )
}

export default Jumbotron;