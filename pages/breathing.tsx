import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import BreathingForm from '../components/Input/Breathing/BreathingForm';
import CountdownTimer from '../components/CountdownTimer/CountdownTimer';
import breathingExercises from '../public/static/breathingExercises.json';

interface SelectionData {
    duration: number | null;
    type: string;
}

interface methodData {
    breathIntervals: number[];
    instructions: string[];
}

const Breathing: React.FC = () => {
    const [selection, setSelection] = useState<SelectionData | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<methodData | null>(null);

    useEffect(() => {
        if (selection) {
            console.log(selection.duration)
            setSelectedMethod(breathingExercises[selection.type]);
        }
    }, [selection])

    return (
        <div className="flex flex-col md:flex-row m-5 md:m-0">
            <Sidebar />
            <div className="flex justify-between md:w-full mt-36">
                <div className="w-1/2 md:m-5">
                    <BreathingForm setSelection={setSelection} />
                    {selectedMethod && <ul className="mt-5 p-5 rounded-lg shadow-double-sm">
                        {selectedMethod && selectedMethod.instructions.map((instruction, idx) => {
                            return <li key={idx}>{instruction}</li>
                        })}
                    </ul>}
                </div>
                {/* <CountdownTimer duration={ selection ? selection.duration : 0 } breathIntervals={ selectedMethod ? selectedMethod.breathIntervals : 0 }/> */}
                    {selectedMethod && <CountdownTimer duration={ selection.duration * 10} breathingMethod={ selectedMethod.breathIntervals } /> }
            </div>
        </div>
    );
}

export default Breathing;