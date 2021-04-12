import { useDate } from '../../../context/useDate';
import Calendar from '../../elements/Calendar';
import CalendarDay from '../../elements/CalendarDay';
import { GoalData } from '../../../Types/GoalData';



interface GoalCalendarProps {
    goalData: GoalData;
}

const GoalCalendar: React.FC<GoalCalendarProps> = ({ goalData }) => {
    const { date, dim } = useDate();
    const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const t = [];
    if (goalData) {
        for (let i = 0; i <= dim + startMonth.getDay() - 1; i++) {
            if (i < startMonth.getDay()) {
                t.push(<div key={i}></div>);
            } else {
                const calendarPos = i - startMonth.getDay() + 1;
                const c = goalData && goalData[calendarPos] == true ? "highlight" : "white";
                t.push(
                    <CalendarDay key={ i } color={c} day={calendarPos} />
                );
            }
        }
    }
    return <Calendar>{t}</Calendar>
}

export default GoalCalendar;