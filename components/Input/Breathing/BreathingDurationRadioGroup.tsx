import { useState, LegacyRef, useEffect } from 'react';

interface P {
    register: (instance: HTMLInputElement, options: object) => LegacyRef<HTMLInputElement> | void;
}

const BreathingDurationRadioGroup: React.FC<P> = ({register}) => {
    const [ clicked, setClicked ] = useState<number | null>(null);

    const durationOptions = [
        1,
        3,
        10
    ];

    const optionsElements = durationOptions.map((option, idx) => {
        return (
            <div className="flex" key={idx}>
                <input
                    type="radio"
                    ref={e => register(e, {
                        required: true,
                    })}
                    id={`duration-${idx}`}
                    name="duration"
                    value={option}
                    // className="w-0 h-0"
                    onClick={() => { setClicked(idx) }}
                ></input>
                <label htmlFor={ `duration-${idx}` }>{ option } min</label>
            </div>
        );
    });

    return (
        <div className="border-2 border-black">
        { optionsElements }
        </div>
    );
}

export default BreathingDurationRadioGroup;