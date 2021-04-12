import React, { useState, createContext, useContext } from 'react';


const DateContext = createContext(null);

export const useDate = () => {
    return useContext(DateContext);
}

export const daysInMonth = (date) => {
    const daysPerMonth = [31, date.getFullYear() % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysPerMonth[date.getMonth()];
}

interface DateContext {
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    dim: number;
}

export const DateProvider = ({ children }) => {
    const [date, setDate] = useState<Date>(new Date());
    const dim = daysInMonth(date);
    const contextValues: DateContext = { date, setDate, dim }

    return <DateContext.Provider value={ contextValues }>{ children }</DateContext.Provider>
}



