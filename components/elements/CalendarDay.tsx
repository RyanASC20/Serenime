import { useDate } from '../../context/useDate';

interface CalendarDayProps {
    color: string;
    day: number;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ color, day }) => {
    const { date, setDate } = useDate();

    return (
        <div
            className={`transition duration-300 py-1.5 md:py-3 rounded-md border-2 border-2 ${day == date.getDate()
                    ? "border-blue-600"
                    : `border-${color}`
                } text-xs font-number ${`bg-${color}`} cursor-pointer hover:border-blue-600 hover:opacity-50`}
            onClick={() => {
                setDate(
                    new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        day
                    )
                );
            }}
        >
            { day}
        </div>
    )
}

export default CalendarDay;