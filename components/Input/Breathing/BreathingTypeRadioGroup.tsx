import { useState, LegacyRef, useEffect } from 'react';

interface P {
    register: (instance: HTMLInputElement, options: object) => LegacyRef<HTMLInputElement> | void;
}

const BreathingTypeRadioGroup: React.FC<P> = ({ register }) => {
    const [clicked, setClicked] = useState<number | null>(null);

    const options = [
        "Energy",
        "Sleep"
    ];

    const optionsElements = options.map((option, idx) => {
        return (
            <div key={idx}>
                <input
                    type="radio"
                    ref={e => register(e, {
                        required: true,
                    })}
                    id={`type-${idx}`}
                    name="type"
                    value={option}
                    className="w-0 h-0"
                    onClick={() => { setClicked(idx) }}
                ></input>
                <label className={`p-5 rounded-lg text-xl cursor-pointer ${clicked == idx ? "border-2 border-green-500" : "" }`} htmlFor={`type-${idx}`}>{option}</label>
            </div>
        );
    });

    return (
        <>
            <h2 className="text-3xl font-light">Type: </h2>
            <div className="m-5 flex justify-around w-5/6">
                {optionsElements}
            </div>
        </>
    );
}

export default BreathingTypeRadioGroup;