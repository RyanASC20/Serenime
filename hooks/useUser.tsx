import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../config/firebase";
import { useDate } from './useDate';

interface userInterface {
  user: object | null;
  userData: {contents: string[], stressLevel: number[]} | null;
  userRef: object | null;
  userDataRef: object | null;
}

// Use UserContext so user can be accessed from children
const UserContext = createContext(null);

// Hook to access UserContext value
export const useUser = () => {
  return useContext(UserContext);
};

// Provider used in _app.js surrounding <Component> so all components have access to user value
export const UserProvider: React.FC = ({ children }) => {

  const [user, setUser] = useState<userInterface>({user: null, userData: null, userRef: null, userDataRef: null});
  const [date, setDate] = useDate()
  const datevalues: number[] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ];

  const [y, m, d]: number[] = datevalues;

  // Set value of UserContext to user when user is changed
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let userRef;
        let userData;
        const fetchUser = async () => {
          userRef = await firestore.collection("users").doc(user.uid).get();
          const userDataRef = firestore.collection("users").doc(user.uid).collection('data');
          // userData = await userDataRef.get()
          setUser({user: userRef.data(), userData: userData, userRef, userDataRef })

          userDataRef.onSnapshot(async (snapshot) => {
            console.log("UPDATING DATA")
            userData = await userDataRef.doc(`${y}-${m}-${d}`).get()
            setUser({user: userRef.data(), userData, userRef, userDataRef });
          });
        };
        fetchUser();

      }
      else {
        setUser({user: null, userData: null, userRef: null, userDataRef: null});
      }
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
