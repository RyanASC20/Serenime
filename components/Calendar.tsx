import DatePicker from "react-datepicker";
import { useDate } from "../hooks/useDate";
import { emoteColors } from "../public/static/icons";

interface P {
    type: string;
    data: any;
    handleClick?: () => void;
}

const Calendar: React.FC<P> = ({ type, data, handleClick }) => {
    const { date, setDate, dim } = useDate();
    const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    console.log("RErender")
    const t = [];
    if (type === "mood") {
        if (data != null) {
            for (let i = 0; i <= dim + startMonth.getDay() - 1; i++) {
                if (i < startMonth.getDay()) {
                    t.push(<div key={i}></div>);
                } else {
                    const calendarPos = i - startMonth.getDay() + 1;
                    const c =
                        data[calendarPos] == null
                            ? "secondary"
                            : emoteColors[Math.floor(data[calendarPos])];
                    t.push(
                        <div
                            key={i}
                            className={`transition duration-300 md:py-3 lg:py-5 rounded-lg border-2 border-2 ${
                                calendarPos == date.getDate()
                                    ? "border-blue-600"
                                    : `border-${c}`
                            } text-sm bg-${c} cursor-pointer hover:border-blue-600 hover:opacity-50`}
                            onClick={() => {
                                setDate(
                                    new Date(
                                        date.getFullYear(),
                                        date.getMonth(),
                                        calendarPos
                                    )
                                );
                            }}
                        >
                            {calendarPos}
                        </div>
                    );
                }
            }
        }
    } else if (type === "habit") {
        // if (data) {
            for (let i = 0; i <= dim + startMonth.getDay() - 1; i++) {
                if (i < startMonth.getDay()) {
                    t.push(<div key={i}></div>);
                } else {
                    const calendarPos = i - startMonth.getDay() + 1;
                    const c = data && data[calendarPos] == true ? "blue-500" : "base";
                    t.push(
                        <div
                            key={i}
                            className={`transition duration-300 md:py-3 lg:py-5 rounded-lg border-2 border-2 ${
                                calendarPos == date.getDate()
                                    ? "border-blue-600"
                                    : `border-${c}`
                            } text-sm bg-${c} cursor-pointer hover:border-blue-600 hover:opacity-50`}
                            onClick={() => {
                                setDate(
                                    new Date(
                                        date.getFullYear(),
                                        date.getMonth(),
                                        calendarPos
                                    )
                                );
                            }}
                        >
                            {calendarPos}
                        </div>
                    );
                }
            }
        // }
    }

    return (
        <div className="p-4 h-full md:w-full bg-card rounded-lg text-center">
            <DatePicker
                className="mt-3 bg-card w-1/2"
                selected={date}
                onChange={(date) => {
                    setDate(date);
                }}
            />
            <div className="grid grid-cols-7 gap-2">
                <div>Sun</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>Th</div>
                <div>F</div>
                <div>Sat</div>
                {t}
            </div>
        </div>
    );
};

export default Calendar;
