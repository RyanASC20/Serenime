import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../config/firebase";
import { useDate } from "./useDate";
import * as firestoreHooks from "../config/firestore";

interface userInterface {
    userData: any;
    entryData: any;
    userRef: any;
    entriesRef: any;
    monthlyData: any;
}

// Use UserContext so user can be accessed from children
const UserContext = createContext(null);

// Hook to access UserContext value
export const useUser = () => {
    return useContext(UserContext);
};

// Provider used in _app.js surrounding <Component> so all components have access to user value
export const UserProvider: React.FC = ({ children }) => {
    console.log("RERENDER");
    const [user, setUser] = useState<userInterface>({
        userData: null,
        entryData: null,
        userRef: null,
        entriesRef: null,
        monthlyData: null
    });

    const [date] = useDate();
    const datevalues: number[] = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
    ];

    const [y, m, d]: number[] = datevalues;
    const cleanedDate = `${y}-${m}-${d}`;

    const fetchData = async (uid) => {
        const [userRef, entriesRef] = firestoreHooks.useDataRefs(
            uid,
            date
        );

        const unsubscribe = entriesRef.onSnapshot(async (snapshot) => {
            const [userData, entryData] = await firestoreHooks.useData(
                userRef,
                entriesRef,
                uid
            );
            const monthlyData = await firestoreHooks.useMonthlyData(uid, date);
            console.log("setting user");
            setUser({
                userData,
                entryData,
                userRef,
                entriesRef,
                monthlyData
            });
        });

        return unsubscribe;
    };

    // Set value of UserContext to user when user is changed
    useEffect(() => {
        auth.onAuthStateChanged((u) => {
            if (u) {
                fetchData(u.uid);
            } else {
                setUser({
                    userData: null,
                    entryData: null,
                    userRef: null,
                    entriesRef: null,
                    monthlyData: null
                });
            }
        });
    }, []);

    useEffect(() => {
        (async function () {
            if (user.userData && user.userData.uid) {
                const unsubscribe = await fetchData(user.userData.uid);
                console.log("FETCHED");
                return function cleanup() {
                    unsubscribe();
                };
            }
        })();
    }, [date]);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// let userRef;
// let userData;
// const fetchUser = async () => {
//   console.log("FETCHING DATA")
//   userRef = await firestore.collection("users").doc(user.uid).get();
//   const userDataRef = firestore.collection("users").doc(user.uid).collection('data');
//   userData = await userDataRef.doc(`${y}-${m}-${d}`).get()
//   console.log(userData)
//   setUser({user: userRef.data(), userData: userData, userRef, userDataRef })

//   userDataRef.onSnapshot(async (snapshot) => {
//     userData = await userDataRef.doc(`${y}-${m}-${d}`).get()
//     setUser({user: userRef.data(), userData, userRef, userDataRef });
//   });
// };
// fetchUser();
