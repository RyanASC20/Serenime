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

export const DateProvider = ({ children }) => {
    const [date, setDate] = useState<Date>(new Date());
    return <DateContext.Provider value={ [date, setDate] }>{ children }</DateContext.Provider>
}


