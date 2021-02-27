import { useEffect, useState } from "react";

interface P {
    duration: number;
}

const CountdownTimer: React.FC<P> = ({ duration }) => {
    const [ paused, setPaused ] = useState(true);
    const [ currentCount, setCurrentCount ] = useState(duration);

    useEffect(() => {
        if (currentCount >= 0 && !paused) {
            setTimeout(() => {
                setCurrentCount(currentCount - 1);
            }, 1000);
        } else {
            setPaused(true);
            setCurrentCount(duration);
        }
        console.log(currentCount, duration)
    }, [currentCount, paused, duration])

    return (
        <>
            { Math.floor(currentCount / 60) }: { currentCount % 60}
            <button className="h-10 border-2 border-black" onClick={() => { setPaused(!paused) }}>toggle</button>
            {/* <button className="h-10 border-2 border-black" onClick={() => { setCurrentCount(0); }}>Reset</button> */}
        </>
    )
}

export default CountdownTimer;