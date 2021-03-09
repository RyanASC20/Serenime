import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../config/firebase";
import { useDate } from "./useDate";


// Use UserContext so user can be accessed from children
const UserContext = createContext(null);

// Hook to access UserContext value
export const useUser = () => {
    return useContext(UserContext);
};

// Provider used in _app.js surrounding <Component> so all components have access to user value
export const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState({});

    // Set value of UserContext to user when user is changed
    useEffect(() => {
        auth.onAuthStateChanged(async(user) => {
            if (user) {
                const userData = await firestore.collection('users').doc(user.uid).get();
                setUser({...userData.data(), uid: user.uid });
            } 
        });
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
