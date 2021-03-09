import { firestore } from "../config/firebase";
import { useDate } from "./useDate";
import { useUser } from "./useUser";

export const useCurrentDayRef = () => {
    const { date } = useDate();
    const { uid } = useUser();

    return firestore
        .collection("users")
        .doc(uid)
        .collection(`${date.getMonth() + 1}-${date.getFullYear()}`)
        .doc(`${date.getDate()}`);
};
