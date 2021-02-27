import { useState, LegacyRef, useEffect } from 'react';

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
                <label className={`p-5 rounded-lg text-xl cursor-pointer ${clicked == idx ? "border-2 border-green-500" : "" }`} htmlFor={`duration-${idx}`}>{option} min</label>
            </div>
        );
    });

    return (
        <>
            <h2 className="text-3xl font-light">Duration: </h2>
            <div className="m-5 flex justify-around w-5/6">
                {optionsElements}
            </div>
        </>
    );
}

export default BreathingDurationRadioGroup;