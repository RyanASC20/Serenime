    import DatePicker from "react-datepicker";

    import { useDate } from "../hooks/useDate";
    import { emoteColors } from "../public/static/icons";
    import { GoalData } from '../Types/GoalData';
    import { AllEntries } from '../Types/MoodData';


    import "react-datepicker/dist/react-datepicker.css";


    interface P {
        type: string;
        data: AllEntries[] | GoalData;
    }

    const Calendar: React.FC<P> = ({ type, data }) => {
        const { date, setDate, dim } = useDate();
        const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const t = [];
        if (type === "mood") {
            if (data != null) {
                for (let i = 0; i <= dim + startMonth.getDay() - 1; i++) {
                    if (i < startMonth.getDay()) {
                        t.push(<div key={i}></div>);
                    } else {
                        const calendarPos = i - startMonth.getDay() + 1;
                        const c =
                            !data[calendarPos]
                                ? "white"
                                : emoteColors[Math.floor(data[calendarPos])];
                        t.push(
                            <div
                                key={i}
                                className={`transition duration-300 py-1.5 md:py-3 rounded-md border-2 border-2 ${
                                    calendarPos == date.getDate()
                                        ? "border-blue-600"
                                        : `border-${c}`
                                } text-xs font-number ${`bg-${c}`} cursor-pointer hover:border-blue-600 hover:opacity-50`}
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
        } else if (type === "goal") {
            // if (data) {
                for (let i = 0; i <= dim + startMonth.getDay() - 1; i++) {
                    if (i < startMonth.getDay()) {
                        t.push(<div key={i}></div>);
                    } else {
                        const calendarPos = i - startMonth.getDay() + 1;
                        const c = data && data[calendarPos] == true ? "highlight" : "white";
                        t.push(
                            <div
                                key={i}
                                className={`transition duration-300 py-1.5 md:py-3 rounded-md border-2 border-2 ${
                                    calendarPos == date.getDate()
                                        ? "border-blue-600"
                                        : `border-${c}`
                                } text-xs ${`bg-${c}`} cursor-pointer hover:border-blue-600 hover:opacity-50`}
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
                <div className="px-8 py-4 mt-5 md:w-full md:h-96 bg-white rounded-xl shadow-md">
                    <DatePicker
                        className="mt-3 mb-5 ml-3 bg-white font-sans-secondary text-lg font-bold text-gray-700"
                        selected={date}
                        onChange={(date) => {
                            setDate(date);
                        }}
                    />
                    
                    <div className="grid grid-cols-7 gap-2 text-center">
                        <div className="text-sm text-gray-400">Sun</div>
                        <div className="text-sm text-gray-400">Mon</div>
                        <div className="text-sm text-gray-400">Tue</div>
                        <div className="text-sm text-gray-400">Wed</div>
                        <div className="text-sm text-gray-400">Thu</div>
                        <div className="text-sm text-gray-400">Fri</div>
                        <div className="text-sm text-gray-400">Sat</div>
                        {t}
                    </div>
                </div>
        );
    };

    export default Calendar;
