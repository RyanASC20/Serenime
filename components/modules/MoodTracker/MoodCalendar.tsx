

import { AllEntries } from '../../../Types/MoodData';
import { useDate } from '../../../context/useDate';
import Calendar from '../../elements/Calendar';
import CalendarDay from '../../elements/CalendarDay';
import { emoteColors } from "../../../icons";
import { GoalData } from '../../../Types/GoalData';



interface MoodCalendarProps {
    moodData: number[];
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({ moodData }) => {
    const { date, setDate, dim } = useDate();
    const startMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const t = [];
    for (let i = 0; i <= dim + startMonth.getDay() - 1; i++) {
        if (i < startMonth.getDay()) {
            t.push(<div key={i}></div>);
        } else {
            const calendarPos = i - startMonth.getDay() + 1;
            const c =
                moodData[calendarPos] == null
                    ? "white"
                    : emoteColors[Math.floor(moodData[calendarPos])];
            t.push(
                <CalendarDay key={ i } color={ c } day={ calendarPos } />
            );
        }
    }
    return <Calendar>{ t }</Calendar>
}

export default MoodCalendar;