import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BreathingForm from '../components/Input/Breathing/BreathingForm';
import CountdownTimer from '../components/CountdownTimer';

const Breathing:React.FC = () => {
    const [ duration, setDuration ] = useState(0);

    console.log(duration);
    return (
        <div className="flex flex-col md:flex-row m-5 md:m-0">
            <Sidebar />
            <div>
                <BreathingForm setDuration={setDuration}/>
                <CountdownTimer duration={ duration }/>
            </div>
        </div>
    );
}

export default Breathing;