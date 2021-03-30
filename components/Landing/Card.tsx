
interface Props {
    reverse?: any;
}

const Card: React.FC<Props> = ({ children, reverse }) => {
    return (
        <div className="md:w-2/3 mt-10 p-6 rounded-lg bg-white">
            <div className={`flex flex-col-reverse md:flex-row items-center justify-around md:text-left text-xl font-light text-gray-500`}>
                { children }
            </div>
        </div>
    )
}

export default Card;