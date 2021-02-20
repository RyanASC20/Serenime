import { useUser } from '../hooks/useUser';
import { useDate } from '../hooks/useDate';
import { colors } from '../public/static/icons';

interface P {
    date: Date;
}



const Calendar: React.FC<P> = ({  }) => {
    const { monthlyData } = useUser();
    const [ date, setDate, dim ] = useDate();
    const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    // const daysPerMonth = [31, date.getFullYear() % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const t = [];
    let i = 0;
    if (monthlyData != null) {
        for (let i = 0; i <= dim + startMonth.getDay() - 1; i++) {
            if (i < startMonth.getDay()) { t.push(<div key={ i }></div>) }
            else {
                const calendarPos = i - startMonth.getDay() + 1 ;
                const c = monthlyData[calendarPos] == null ? 'base' : colors[Math.floor(monthlyData[calendarPos])];
                console.log(monthlyData[calendarPos])
                t.push(<div key={ i } className={ `p-1 rounded-lg text-sm bg-${c}` }>{ calendarPos }</div> )
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