interface P {
    text: string;
    textSize?: string;
    onClick?: any;
}

const Button: React.FC<P> = ({ text, textSize, onClick }) => {

    return (
        <button 
            className={`transition duration-300 px-5 py-2 rounded-lg text-light text-${textSize ? textSize : 'sm'} text-red-500 hover:text-white hover:bg-red-500 border border-red-500 rounded-sm focus:outline-none`}
            type="button"
            onClick={onClick}
        >
        {text}</button>
    );
}

export default Button;