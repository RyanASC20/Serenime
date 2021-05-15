import DatePicker from "react-datepicker";

import { useDate } from "../../context/useDate";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";


const Calendar: React.FC = ({ children }) => {
    const { date, setDate } = useDate();

    useEffect(() => {
        console.log(date);
    })

    const changeMonth = (difference: number): void => {
        const currentMonth: number = date.getMonth();
        const currentYear: number = date.getFullYear();

        let newMonth: number = currentMonth + difference;
        let newYear: number = currentYear;
        if (newMonth === -1 || newMonth === 12) {
            if (newMonth === -1) {
                newMonth = 11;
            } else {
                newMonth = 0;
            }
            newYear = currentYear + difference;
        }

        setDate(new Date(newYear, newMonth, 1));
    }

    return (
        <div className="px-8 py-4 mt-5 md:w-full bg-white rounded-xl shadow-md">
            <div className="flex justify-between mt-3 mb-5">
                <span className="cursor-pointer" onClick={() => { changeMonth(-1) }}>&lt;</span>
                <DatePicker
                    className="text-center bg-white font-sans-secondary text-lg font-bold text-gray-700"
                    selected={date}
                    onChange={(date) => {
                        setDate(date);
                    }}
                />
                <span className="cursor-pointer" onClick={() => { changeMonth(1) }}>&gt;</span>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center">
                <div className="text-sm text-gray-400">Sun</div>
                <div className="text-sm text-gray-400">Mon</div>
                <div className="text-sm text-gray-400">Tue</div>
                <div className="text-sm text-gray-400">Wed</div>
                <div className="text-sm text-gray-400">Thu</div>
                <div className="text-sm text-gray-400">Fri</div>
                <div className="text-sm text-gray-400">Sat</div>
                {children}
            </div>
        </div>
    );
};

export default Calendar;
