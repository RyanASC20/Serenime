import { useEffect, useRef, useState } from "react";
import Zoom from 'react-reveal/Zoom';

import Button from '../Buttons/Button';
import styles from './CountdownTimer.module.css';

interface P {
    duration: number;
    breathingMethod?: object;
}

const CountdownTimer: React.FC<P> = ({ duration, breathingMethod }) => {
    
    const [paused, setPaused] = useState(true);
    const [currentCount, setCurrentCount] = useState(duration);
    const delay = useRef(null);
    const intervalPosition = useRef(0);
    const breathIntervals = Object.values(breathingMethod);
    const [intervalBreakpoint, setIntervalBreakpoint] = useState(duration - breathIntervals[0]);

    const reset = () => {
        clearTimeout(delay.current);
        setPaused(true);
        intervalPosition.current = 0;
        setIntervalBreakpoint(duration - breathIntervals[0]);
        setCurrentCount(duration);

    }

    useEffect(() => {
        reset();
    }, [breathingMethod, duration]);


    useEffect(() => {
        if (paused) { clearTimeout(delay.current) }
        else if (currentCount > 0) {
            delay.current = setTimeout(() => {
                setCurrentCount(currentCount - 1);
            }, 1000);
            if (currentCount == intervalBreakpoint) {
                intervalPosition.current = (intervalPosition.current + 1) % breathIntervals.length;
                setIntervalBreakpoint(currentCount - breathIntervals[intervalPosition.current]);
            }
        }
    }, [currentCount, paused])

    return (
        <Zoom duration={200}>
            <div className="flex flex-col justify-center items-center mt-6 py-10 bg-white rounded-xl shadow-md md:h-96">
                <div className={`flex flex-col items-center ${styles.timer}`}>
                    <p className="mb-5 text-7xl font-thin">{currentCount / 60 < 10 ? 0 : ''}{Math.floor(currentCount / 60)}:{currentCount % 60 < 10 ? 0 : ''}{currentCount % 60}</p>
                    { breathingMethod && <p className="text-3xl font-light capitalize">{Object.keys(breathingMethod)[intervalPosition.current]}</p> }
                    { breathIntervals && <p className="text-2xl font-light">...{currentCount - intervalBreakpoint}</p>}
                </div>

                <div className="flex justify-between w-1/2 md:w-2/5 mt-4">
                    <Button text={paused ? "Play" : "Pause"} onClick={() => { setPaused(!paused); }} />
                    <Button text="Reset" onClick={() => {
                        reset();
                    }} />
                </div>
            </div>
        </Zoom>
    )
}

export default CountdownTimer;