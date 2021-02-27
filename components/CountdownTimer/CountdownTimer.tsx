import { useEffect, useRef, useState } from "react";
import styles from './CountdownTimer.module.css';

interface P {
    duration: number;
    breathIntervals: number[] | number;
}

const CountdownTimer: React.FC<P> = ({ duration, breathIntervals }) => {
    const [paused, setPaused] = useState(true);
    const [currentCount, setCurrentCount] = useState(duration);
    const intervalPosition = useRef(0);
    const intervalBreakpoint = useRef(currentCount - breathIntervals[intervalPosition.current]);

    const animationPostions = ["in", "hold", "out"];
    

    useEffect(() => {
        console.log(duration, currentCount, intervalBreakpoint.current);
        if (currentCount >= 0 && !paused) {
            setTimeout(() => {
                setCurrentCount(currentCount - 1);
            }, 1000);
            if (currentCount == intervalBreakpoint.current) {
                intervalPosition.current = (intervalPosition.current + 1) % 3;
                intervalBreakpoint.current = currentCount - breathIntervals[intervalPosition.current];
            }
        } else {
            setPaused(true);
            intervalBreakpoint.current = currentCount - breathIntervals[intervalPosition.current];
        }
    }, [currentCount, paused, duration])

    return (
        <div className="flex flex-col items-center md:w-2/3">
            <div className={`rounded-full bg-green-500 w-96 h-96 ${!paused ? styles[animationPostions[intervalPosition.current]] : "" }`}></div>
            { Math.floor(currentCount / 60)}: { currentCount % 60}
            <div>{ currentCount - intervalBreakpoint.current + 1}</div>
            <div>
                <button className="p-3 text-light text-2xl text-green-500 rounded-lg border-2 border-gray-500" onClick={() => { setPaused(!paused) }}>{paused ? "Play" : "Pause"}</button>
                <button className="p-3 text-light text-2xl text-green-500 rounded-lg border-2 border-gray-500" 
                    onClick={() => { 
                        setCurrentCount(duration); 
                        intervalPosition.current = 0; 
                        intervalBreakpoint.current = duration - breathIntervals[intervalPosition.current] + 1;
                        setPaused(true); 
                }}>Reset</button>
            </div>
            

        </div>
    )
}

export default CountdownTimer;