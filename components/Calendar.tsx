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
                            ? "card"
                            : emoteColors[Math.floor(data[calendarPos])];
                    t.push(
                        <div
                            key={i}
                            className={`transition duration-300 py-3 lg:py-5 rounded-md border-2 border-2 ${
                                calendarPos == date.getDate()
                                    ? "border-blue-600"
                                    : `border-${c}`
                            } text-md ${`bg-${c}`} cursor-pointer hover:border-blue-600 hover:opacity-50`}
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
                    const c = data && data[calendarPos] == true ? "highlight" : "card";
                    t.push(
                        <div
                            key={i}
                            className={`transition duration-300 py-3 lg:py-5 rounded-md border-2 border-2 ${
                                calendarPos == date.getDate()
                                    ? "border-blue-600"
                                    : `border-${c}`
                            } text-sm ${`bg-${c}`} cursor-pointer hover:border-blue-600 hover:opacity-50`}
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
            <div className="p-4 mt-5 md:w-full bg-card rounded-md">
                <DatePicker
                    className="my-5 ml-3 bg-card text-lg font-bold text-gray-700"
                    selected={date}
                    onChange={(date) => {
                        setDate(date);
                    }}
                />
                
                <div className="grid grid-cols-7 gap-2 text-center">
                    <div className="font-bold text-gray-500">SAT</div>
                    <div className="font-bold text-gray-500">MON</div>
                    <div className="font-bold text-gray-500">TUE</div>
                    <div className="font-bold text-gray-500">WED</div>
                    <div className="font-bold text-gray-500">THU</div>
                    <div className="font-bold text-gray-500">FRI</div>
                    <div className="font-bold text-gray-500">SAT</div>
                    {t}
                </div>
            </div>
    );
};

export default Calendar;
