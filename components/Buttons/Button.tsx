import { useState } from 'react';


interface P {
    text: string;
    bgcolor?: string;
    textColor?: string;
    borderColor?: string;
    hoverColor?: string;
    textSize?: string;
    type?: any;
    onClick?: any;
    full?: boolean;
}

const Button: React.FC<P> = ({ text, bgcolor, textColor, borderColor, hoverColor, textSize, type, onClick, full }) => {

    return (
        <button 
            className={` transition duration-300 ${full && 'w-full'} px-5 py-2 rounded-lg text-light text-${textSize ? textSize : 'sm'} ${textColor ? `text-${textColor}` : 'text-white'} hover:bg-${hoverColor} rounded-sm ${bgcolor? `bg-${bgcolor}` : 'bg-highlight'} ${borderColor && `border border-${borderColor}`} focus:outline-none`}
            type={type ? type : "submit"}
            onClick={onClick}
        >
        {text}</button>
    );
}

export default Button;