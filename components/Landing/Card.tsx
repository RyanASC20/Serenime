
interface Props {
    reverse?: any;
}

const Card: React.FC<Props> = ({ children, reverse }) => {
    return (
        <div className="w-11/12 md:w-2/3 mt-10 p-3 md:p-6 rounded-t-md bg-white">
            <div className={`flex flex-col md:flex-row items-center justify-around md:text-left text-xl font-light font-sans2 text-gray-500`}>
                { children }
            </div>
        </div>
    )
}

export default Card;