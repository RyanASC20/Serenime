import { useUser } from '../hooks/useUser';
import { useDate } from '../hooks/useDate';
import { emoteColors } from '../public/static/icons';

interface P {
    date: Date;
}

const Calendar: React.FC<P> = ({  }) => {
    const { monthlyData } = useUser();
    const [ date, setDate, dim ] = useDate();
    const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    console.log(monthlyData);
    const t = [];
    if (monthlyData != null) {
        for (let i = 0; i <= dim + startMonth.getDay() - 1; i++) {
            if (i < startMonth.getDay()) { t.push(<div key={ i }></div>) }
            else {
                const calendarPos = i - startMonth.getDay() + 1 ;
                const c = monthlyData[calendarPos] == null ? 'base-dark' : emoteColors[Math.floor(monthlyData[calendarPos])];
                t.push(<div key={ i } className={ `transition duration-300 p-1 rounded-lg text-sm bg-${c} cursor-pointer border-2 border-${c} hover:border-green-900 hover:opacity-50` } onClick={() => { setDate(new Date(date.getFullYear(), date.getMonth(), calendarPos)) } }>{ calendarPos }</div> )
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
        <div className="grid grid-cols-7 gap-2">
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
            { t }
        </div>
    )
}

export default Calendar;