import { useState, LegacyRef, Dispatch, SetStateAction } from 'react';
import Radio from '../RadioButton';

interface P {
    register: (instance: HTMLInputElement, options: object) => LegacyRef<HTMLInputElement> | void;
    setSelection: Dispatch<SetStateAction<object>>;
}

const BreathingTypeRadioGroup: React.FC<P> = ({ register, setSelection }) => {
    const [clicked, setClicked] = useState<number | null>(null);

    const options = [
        "Energy",
        "Sleep",
        "Resonant Breathing",
        "Box Breathing"
    ];

    const optionsElements = options.map((option, idx) => {
        return (
            <div key={idx}>
                <Radio
                    register={register}
                    id={`type-${idx}`}
                    name="type"
                    value={option}
                    onClick={() => { setClicked(idx); setSelection({duration: null, type: option}) }}
                    htmlFor={`type-${idx}`} 
                    text={option} 
                    clicked={ clicked === idx }
                />
            </div>
        );
    });

    return (
        <>
            <h2 className="text-lg">Type: </h2>
            <div className="m-3">
                {optionsElements}
            </div>
        </>
    );
}

export default BreathingTypeRadioGroup;