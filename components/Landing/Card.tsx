
interface Props {
    reverse?: any;
}

const Card: React.FC<Props> = ({ children, reverse }) => {
    return (
        <div className="md:w-3/5 mt-10 p-6 rounded-lg bg-white">
            <div className={`flex flex-col-reverse md:flex-row items-center center md:text-left text-xl font-light text-gray-500`}>
                { children }
            </div>
        </div>
    )
}

export default Card;