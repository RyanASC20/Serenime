import { useState, LegacyRef, useEffect } from 'react';

interface P {
    register: (instance: HTMLInputElement, options: object) => LegacyRef<HTMLInputElement> | void;
}

const BreathingTypeRadioGroup: React.FC<P> = ({register}) => {
    const [ clicked, setClicked ] = useState<number | null>(null);

    const options = [
        "Energy",
        "Sleep"
    ];

    const optionsElements = options.map((option, idx) => {
        return (
            <div className="flex" key={idx}>
                <input
                    type="radio"
                    ref={e => register(e, {
                        required: true,
                    })}
                    id={`type-${idx}`}
                    name="type"
                    value={option}
                    // className="w-0 h-0"
                    onClick={() => { setClicked(idx) }}
                ></input>
                <label htmlFor={ `type-${idx}` }>{ option }</label>
            </div>
        );
    });

    return (
        <div className="border-2 border-black">
        { optionsElements }
        </div>
    );
}

export default BreathingTypeRadioGroup;