import { useForm } from "react-hook-form";
import { useDocumentData, useDocument } from "react-firebase-hooks/firestore";
import Zoom from 'react-reveal/Zoom';

import { firestore } from "../../config/firebase";
import { useUser } from "../../hooks/useUser";
import { useDate } from "../../hooks/useDate";
import Calendar from "../Calendar";
import Button from '../Button';

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
    const data = useHabitData(selectedCategory);
    const { uid } = useUser();
    const { date } = useDate();

    const handleClick = (b: boolean) => {
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
                {/* <form onSubmit={handleSubmit(onSubmit)} className="mb-4"> */}
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
                            onClick={() => handleClick(true)}
                        // className="w-0 h-0" 
                        ></input>
                        <label
                            // className={`transition transition-duration-250 p-2 rounded-lg text-lg font-light cursor-pointer border-2 border-card hover:border-secondary `}
                            className="ml-3 text-lg"
                            htmlFor={'habit-yes'}
                        >
                            {/* <Button type="submit" text="Yes" onClick={() => handleClick(true) }/> */}
                            Yes
                        </label>
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

                        // className="w-0 h-0"
                        ></input>
                        <label
                            // className={`transition transition-duration-250 p-2 rounded-lg text-lg font-light cursor-pointer border-2 border-card hover:border-secondary`}
                            className="ml-3 text-lg"
                            htmlFor={'habit-no'}
                        >
                            No
                            {/* <Button type="submit" text="No" onClick={() => { handleClick(false) } } /> */}
                        </label>
                    </div>
                    {/* <Button type="submit" text="Confirm" /> */}

                </div>
                {/* </form> */}
                <Calendar type="habit" data={data} />
            </div>
        </Zoom>
    );
};

export default HabitContent;
