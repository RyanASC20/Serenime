import { useState, LegacyRef, Dispatch, SetStateAction } from 'react';

interface P {
    register: (instance: HTMLInputElement, options: object) => LegacyRef<HTMLInputElement> | void;
    setSelection: Dispatch<SetStateAction<object>>;
}

const BreathingTypeRadioGroup: React.FC<P> = ({ register, setSelection }) => {
    const [clicked, setClicked] = useState<number | null>(null);

    const options = [
        "Energy",
        "Sleep",
        "Resonant Breathing"
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
                    onClick={() => { setClicked(idx); setSelection({duration: null, type: option}) }}
                ></input>
                <label className={`transition transition-duration-250 p-3 rounded-lg text-lg font-light cursor-pointer border-2 border-card hover:border-secondary ${clicked == idx ? "bg-secondary" : "" }`} htmlFor={`type-${idx}`}>{option}</label>
            </div>
        );
    });

    return (
        <>
            <h2 className="text-xl">Type: </h2>
            <div className="m-5 flex justify-between w-5/6">
                {optionsElements}
            </div>
        </>
    );
}

export default BreathingTypeRadioGroup;