import { useState, useContext, createContext } from 'react';



const SidebarContext = createContext(null);

export const useSidebarState = () => {
    return useContext(SidebarContext);
}

export const SidebarProvider = ({ children }) => {
    const [ sidebarOpen, setSidebarOpen ] = useState(true);
    return <SidebarContext.Provider value={ { sidebarOpen, setSidebarOpen }}> { children }</SidebarContext.Provider>
}

