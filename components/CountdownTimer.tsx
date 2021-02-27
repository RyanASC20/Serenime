
interface P {
    startTime: number;
}

const CountdownTimer: React.FC<P> = ({ startTime }) => {
    return (
        <>
        { startTime }
        </>
    )
}

export default CountdownTimer;