import React, { useState } from 'react';
import { useDocument } from "react-firebase-hooks/firestore";
import Zoom from 'react-reveal/Zoom';

import { firestore } from "../../config/firebase";
import { useUser } from "../../hooks/useUser";
import { useDate } from "../../hooks/useDate";
import Calendar from "../Calendar";
import Label from '../Input/Label';
import { GoalData } from '../../Types/GoalData';

const useGoalData = (selectedCategory: string): GoalData | undefined => {
    const { uid } = useUser();
    const { date } = useDate();
    const [value, loading, error] = useDocument(
        firestore
            .collection("users")
            .doc(uid)
            .collection("goals")
            .doc("categories")
            .collection(selectedCategory)
            .doc(`${date.getMonth() + 1}-${date.getFullYear()}`)
    );
    if (value) {
        const data = value.data()
        return data as GoalData;
    }
    return undefined;
};

interface Props {
    selectedCategory: string;
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const GoalContent: React.FC<Props> = ({ selectedCategory, setSubmitted }) => {

    const [ clicked, setClicked ] = useState<string | null>(null);
    const data = useGoalData(selectedCategory);
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
            .collection("goals")
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
                            id={"goal-yes"}
                            name="answer"
                            value={"true"}
                            onClick={() => { handleClick(true)}}
                            className="w-0 h-0" 
                        ></input>
                            <Label htmlFor="goal-yes" text="Yes" clicked={ clicked === 'yes' } />
                        </div>
                    <div>
                        <input
                            type="radio"
                            // ref={(e) =>
                            //     register(e, {
                            //         required: true,
                            //     })
                            // }
                            id={"goal-no"}
                            name="answer"
                            value={"false"}
                            onClick={() => handleClick(false)}

                            className="w-0 h-0"
                        ></input>
                        <Label htmlFor="goal-no" text="No" clicked={ clicked === 'no' } />
                    </div>
                </div>
                <Calendar type="goal" data={data} />
                </div>
        </Zoom>
    );
};

export default GoalContent;
