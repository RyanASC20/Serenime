import { useState, useContext, createContext, useEffect } from 'react';



const SidebarContext = createContext(null);

export const useSidebarState = () => {
    return useContext(SidebarContext);
}

export const SidebarProvider = ({ children }) => {
    const [ sidebarOpen, setSidebarOpen ] = useState(true);
    const [ windowWidth, setWindowWidth ] = useState(null);
    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, [])

    return <SidebarContext.Provider value={ { sidebarOpen, setSidebarOpen, windowWidth}}> { children }</SidebarContext.Provider>
}

