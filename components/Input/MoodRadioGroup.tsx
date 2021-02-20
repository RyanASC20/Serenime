import { useState } from 'react';
import { iconElements } from "../../public/static/icons";

interface P {
    register: any;
}
const MoodRadioGroup: React.FC<P> = ({ register }) => {
    const [ clicked, setClicked ] = useState<number | null>(null);
    const iconElementsSelectable = iconElements.map((ic, idx) => {
        return (
            <div className="flex" key={idx}>
                <input
                    type="radio"
                    ref={register}
                    id={`mood-${idx}`}
                    name="mood"
                    value={idx}
                    className={`w-0 h-0`}
                    onClick={() => setClicked(idx)}
                ></input>
                <label className={`border-2 rounded-full shadow-double-xs cursor-pointer hover:shadow-inner ${clicked === idx ? 'p-1 border-green-600' : '' }` } htmlFor={ `mood-${idx}` }>{ ic }</label>
            </div>
        );
    });
    return <ul className="flex justify-around">{iconElementsSelectable}</ul>;
};

export default MoodRadioGroup;
