import { useState } from 'react';
import { useDocumentData } from "react-firebase-hooks/firestore";
import Zoom from 'react-reveal/Zoom';

import { firestore } from "../../config/firebase";
import { useUser } from "../../hooks/useUser";
import { useDate } from "../../hooks/useDate";
import Calendar from "../Calendar";
import Label from '../Input/Label';

const useHabitData = (selectedCategory: string) => {
    const { uid } = useUser();
    const { date } = useDate();
    const [value, loading, error] = useDocumentData(
        firestore
            .collection("users")
            .doc(uid)
            .collection("habits")
            .doc("categories")
            .collection(selectedCategory)
            .doc(`${date.getMonth() + 1}-${date.getFullYear()}`)
    );
    // console.log(value.data());
    return value;
};

interface P {
    selectedCategory: string;
    setSubmitted: (b: boolean) => void;
}

interface FormData {
    answer: string;
}

const HabitContent: React.FC<P> = ({ selectedCategory, setSubmitted }) => {

    const [ clicked, setClicked ] = useState<string | null>(null);
    const data = useHabitData(selectedCategory);
    const { uid } = useUser();
    const { date } = useDate();

    const handleClick = (b: boolean) => {
        if (b) {
            setClicked('yes') 
        } else {
            setClicked('no');
        }


        firestore
            .collection("users")
            .doc(uid)
            .collection("habits")
            .doc("categories")
            .collection(selectedCategory)
            .doc(`${date.getMonth() + 1}-${date.getFullYear()}`)
            .set(
                {
                    [date.getDate()]: b
                },
                { merge: true }
            );
        setSubmitted(b);
    };

    return (
        <Zoom duration={300}>
            <div className="md:w-2/3 md:h-5/6">
                <div className="my-3">
                    <div>
                        <input
                            type="radio"
                            // ref={(e) =>
                            //     register(e, {
                            //         required: true,
                            //     })
                            // }
                            id={"habit-yes"}
                            name="answer"
                            value={"true"}
                            onClick={() => { handleClick(true)}}
                            className="w-0 h-0" 
                        ></input>
                            <Label htmlFor="habit-yes" text="Yes" clicked={ clicked === 'yes' } />
                        </div>
                    <div>
                        <input
                            type="radio"
                            // ref={(e) =>
                            //     register(e, {
                            //         required: true,
                            //     })
                            // }
                            id={"habit-no"}
                            name="answer"
                            value={"false"}
                            onClick={() => handleClick(false)}

                            className="w-0 h-0"
                        ></input>
                        <Label htmlFor="habit-no" text="No" clicked={ clicked === 'no' } />
                    </div>
                </div>
                <Calendar type="habit" data={data} />
                </div>
        </Zoom>
    );
};

export default HabitContent;
