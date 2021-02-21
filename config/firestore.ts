import { firestore } from './firebase';
import { daysInMonth } from '../hooks/useDate';


export const useUserRef = (uid: string | null) => {
    return firestore.collection("users").doc(uid);
}


export const useEntriesRef = (uid: string, date: Date | null) => {
    return firestore.collection("users").doc(uid).collection(`${date.getMonth() + 1}-${date.getFullYear()}`).doc(`${date.getDate()}`);
}


export const useDataRefs = (uid, date: Date | null) => {
    return [ useUserRef(uid), useEntriesRef(uid, date) ]
}


export const useUserData = async(uid: string, userRef) => {
    const d = await userRef.get();
    return { uid, ...d.data() };
}


export const useEntryData = async(entriesRef) => {
    const d = await entriesRef.get();
    return d.data();
}


export const useData = (userRef, entriesRef, uid: string) => {
    // console.log(userRef);
    return Promise.all([ useUserData(uid, userRef), useEntryData(entriesRef) ]);
}

export const useMonthlyData = async(uid: string, date: Date | null) => {
    const snapshot = await firestore.collection("users").doc(uid).collection(`${date.getMonth() + 1}-${date.getFullYear()}`).get();


    const values = [];
    for (let i = 0; i < daysInMonth(date); i++) {
        values.push(null);
    }

    snapshot.forEach(doc => {
        const data = doc.data();
        const moods = data.moods;
        if (moods.length > 0) {
            const sum = moods.reduce((acc, cur) => {
                return acc + parseInt(cur.mood)
            }, 0);
            const mean = sum / moods.length;
            values[parseInt(doc.id)] = mean;
        }
    });
    return values;
}

