import { useEffect, useRef, useState } from "react";
import Button from '../Button';
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
            <div className={`flex justify-center items-center rounded-full bg-green-500 w-96 h-96 ${!paused ? styles[animationPostions[intervalPosition.current]] : "" }`}>
                <div className={`flex justify-center items-center w-52 h-52 rounded-full bg-base`}>
                    <p className="text-3xl font-light capitalize">{animationPostions[intervalPosition.current]}</p>
                    <p className="text-lg font-light">...{ currentCount - intervalBreakpoint.current + 1}</p>
                </div>
            </div>
            <p className="m-8 text-4xl font-thin">{ Math.floor(currentCount / 60)}:{ currentCount % 60}</p>
            <div>
                <Button text={paused ? "Play" : "Pause"} textColor="green" onClick={() => { setPaused(!paused) }} />
                <Button text="Reset" textColor="green" onClick={() => { 
                        intervalPosition.current = 0; 
                        intervalBreakpoint.current = duration - breathIntervals[intervalPosition.current] + 1;
                        setPaused(true); 
                        setCurrentCount(duration); 
                } } />
            </div>
            

        </div>
    )
}

export default CountdownTimer;