import { useEffect, useRef, useState } from "react";
import anime from 'animejs';
import Button from '../Button';
import styles from './CountdownTimer.module.css';

interface P {
    duration: number;
    breathingMethod: object;
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
        <div className="flex flex-col items-center md:w-2/3">
            <p className="m-8 text-4xl font-thin">{Math.floor(currentCount / 60)}:{currentCount % 60}</p>
            <p className="text-3xl font-light capitalize">{Object.keys(breathingMethod)[intervalPosition.current]}</p>
            { breathIntervals && <p className="text-lg font-light">...{currentCount - intervalBreakpoint}</p>}

            <div>
                <Button text={paused ? "Play" : "Pause"} textColor="green" onClick={() => { setPaused(!paused); }} />
                <Button text="Reset" textColor="green" onClick={() => {
                    reset();
                }} />
            </div>
        </div>
    )
}

export default CountdownTimer;