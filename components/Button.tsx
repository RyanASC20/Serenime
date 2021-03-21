import { useState } from 'react';


interface P {
    text: string;
    hoverColor?: string;
    textSize?: string;
    type?: any;
    onClick?: any;
    full?: boolean;
}

const Button: React.FC<P> = ({ text, hoverColor, textSize, type, onClick, full }) => {

    return (
        <button 
            className={` transition duration-300 ${full && 'w-full'} px-5 py-0.5 rounded-lg text-light text-${textSize ? textSize : 'md'} text-white hover:bg-${hoverColor} rounded-sm bg-highlight focus:outline-none`}
            type={type ? type : "submit"}
            onClick={onClick}
        >
        {text}</button>
    );
}

export default Button;