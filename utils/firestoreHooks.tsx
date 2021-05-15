import { firestore } from "../config/firebase";
import { useDate } from "../context/useDate";
import { useUser } from "../context/useUser";

export const useCurrentDayRef = () => {
    const { date } = useDate();
    const { uid } = useUser();

    return firestore
        .collection("users")
        .doc(uid)
        .collection(`${date.getMonth() + 1}-${date.getFullYear()}`)
        .doc(`${date.getDate()}`);
};


export const useHabitRef = (selectedCategory) => {
    const { uid } = useUser();
    const { date } = useDate();
    return firestore
        .collection("users")
        .doc(uid)
        .collection('habits')
        .doc('categories')
        .collection(selectedCategory)
        .doc(`${date.getMonth() + 1}-${date.getFullYear()}`)
}

export const useHabitCategoriesRef = () => {
    const { uid } = useUser();
    const { date } = useDate();
    return firestore
            .collection("users")
            .doc(uid)
            .collection('habits')
            .doc('categories')
}

export const usePictureCollectionRef = () => {
    const { uid } = useUser();
    return firestore
            .collection("users")
            .doc(uid)
            .collection("pictures")
}

export const useGalleryRef = () => {
    const { uid } = useUser();
    return firestore
            .collection("users")
            .doc(uid)
            .collection("pictures")
            .doc("gallery");
}

export const usePictureRef = (id: string) => {
    const { uid } = useUser();
    return firestore
            .collection("users")
            .doc(uid)
            .collection("pictures")
            .doc(id);
}