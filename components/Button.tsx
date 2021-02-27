
interface P {
    text: string;
    textColor: string;
    textSize?: string;
    type?: any;
    onClick?: any;
}

const Button: React.FC<P> = ({ text, textColor, textSize, type, onClick }) => {
    return (
        <button 
            className={`p-2 m-2 text-light text-${textSize ? textSize : '2xl'} text-${textColor}-500 rounded-lg border-2 border-gray-300 hover:border-gray-500`}
            type={type ? type : "submit"}
            onClick={onClick}
        >
        {text}</button>
    );
}

export default Button;