import React, { LabelHTMLAttributes } from 'react';
import Label from './Label';

interface Input {
    name: string;
    id: string;
    value: string | number;
    onClick: () => void;
    register?: (instance: HTMLInputElement, options: object) => React.LegacyRef<HTMLInputElement> | void;
}

interface Label {
    text: string;
    clicked: boolean;
    htmlFor: string;
}

type Props = Input & Label;

const Radio: React.FC<Props> = ({ name, id, value, onClick, register, text, clicked, htmlFor}) => {
    return (
        <div>
            <input
                type="radio"
                name={name}
                id={id}
                value={value}
                onClick={() => { onClick() } }
                ref={e => {
                    if (register) { return register(e, {required: true}) }
                }}
                className="w-0 h-0"
            >
            
            </input>
            <Label text={text} htmlFor={htmlFor} clicked={clicked} />
        </div>
    )
}

export default Radio;