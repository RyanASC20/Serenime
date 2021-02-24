import DatePicker from "react-datepicker";
import { useUser } from '../hooks/useUser';
import { useDate } from '../hooks/useDate';
import { emoteColors } from '../public/static/icons';

interface P {
    date: Date;
}

const Calendar: React.FC<P> = ({ }) => {
    const { monthlyData } = useUser();
    const [date, setDate, dim] = useDate();
    const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    const t = [];
    if (monthlyData != null) {
        for (let i = 0; i <= dim + startMonth.getDay() - 1; i++) {
            if (i < startMonth.getDay()) { t.push(<div key={i}></div>) }
            else {
                const calendarPos = i - startMonth.getDay() + 1;
                const c = monthlyData[calendarPos] == null ? 'base' : emoteColors[Math.floor(monthlyData[calendarPos])];
                t.push(<div key={i} className={`transition duration-300 p-1 rounded-lg border-2 border-2 ${calendarPos == date.getDate() ? 'border-blue-600' : `border-${c}`} text-sm bg-${c} cursor-pointer hover:border-blue-600 hover:opacity-50`} onClick={() => { setDate(new Date(date.getFullYear(), date.getMonth(), calendarPos)) }}>{calendarPos}</div>)
            }
        }
    }



    return (
        // <table>
        //     <tr>
        //         <th>Sun</th>
        //         <th>M</th>
        //         <th>T</th>
        //         <th>W</th>
        //         <th>Th</th>
        //         <th>F</th>
        //         <th>Sat</th>
        //     </tr>
        // </table>
        <>
            <DatePicker
                className="mt-3 bg-base-dark w-1/2"
                selected={date}
                onChange={(date) => {
                    setDate(date);
                }}
            />
            <div className="grid grid-cols-7">
                <div>
                    Sun
            </div>
                <div>
                    M
            </div>
                <div>
                    T
            </div>
                <div>
                    W
            </div>
                <div>
                    Th
            </div>
                <div>
                    F
            </div>
                <div>
                    Sat
            </div>
                {t}
            </div>
        </>
    )
}

export default Calendar;