interface Props {
    text: string;
    clicked: boolean;
    htmlFor: string;
}

const Label: React.FC<Props> = ({htmlFor, text, clicked}) => {
    return (
        <label className="inline-block ml-2 my-1.5 font-light text-md" htmlFor={htmlFor}>
            <div className={`transition duration-200 inline-flex justify-center items-center w-5 h-5 mr-2 rounded-full border ${clicked ? 'border-highlight-secondary' : 'border-gray-400' }`}>
                <div
                    className={`transition duration-200 w-3 h-3 rounded-full ${
                        clicked ? "opacity-100" : "opacity-0"
                    } bg-highlight-secondary`}
                ></div>
            </div>
            { text }
        </label>
    );
};

export default Label;
