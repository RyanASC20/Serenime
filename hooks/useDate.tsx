import { useState, createContext, useContext } from 'react';
import { start } from 'repl';

// interface DateContextData {
//     date: Date;
//     setDate: Dispatch<SetStateAction<Date>>
// }

const DateContext = createContext(null);

export const useDate = () => {
    return useContext(DateContext);
}

export const daysInMonth = (date) => {
    const daysPerMonth = [31, date.getFullYear() % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysPerMonth[date.getMonth()];
}


export const DateProvider = ({ children }) => {
    const [date, setDate] = useState<Date>(new Date());
    const dim = daysInMonth(date);

    return <DateContext.Provider value={ [ date, setDate, dim ] }>{ children }</DateContext.Provider>
}



