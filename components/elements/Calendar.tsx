import DatePicker from "react-datepicker";

import { useDate } from "../../context/useDate";

import "react-datepicker/dist/react-datepicker.css";


const Calendar: React.FC = ({ children }) => {
    const { date, setDate } = useDate();

    return (
            <div className="px-8 py-4 mt-5 md:w-full bg-white rounded-xl shadow-md">
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
                    { children }
                </div>
            </div>
    );
};

export default Calendar;
