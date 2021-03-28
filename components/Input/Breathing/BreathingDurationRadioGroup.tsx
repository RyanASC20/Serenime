import { useState, LegacyRef, useEffect } from 'react';
import Label from '../Label';

interface P {
    register: (instance: HTMLInputElement, options: object) => LegacyRef<HTMLInputElement> | void;
}

const BreathingDurationRadioGroup: React.FC<P> = ({ register }) => {
    const [clicked, setClicked] = useState<number | null>(null);

    const durationOptions = [
        1,
        3,
        10
    ];

    const optionsElements = durationOptions.map((option, idx) => {
        return (
            <div key={idx}>
                <input
                    type="radio"
                    ref={e => register(e, {
                        required: true,
                    })}
                    id={`duration-${idx}`}
                    name="duration"
                    value={option}
                    className="w-0 h-0"
                    onClick={() => { setClicked(idx) }}
                ></input>
                <Label htmlFor={`duration-${idx}`} text={`${option} min`} clicked={clicked === idx} />
            </div>
        );
    });

    return (
        <>
            <h2 className="text-lg">Duration: </h2>
            <div className="m-3 w-5/6">
                {optionsElements}
            </div>
        </>
    );
}

export default BreathingDurationRadioGroup;