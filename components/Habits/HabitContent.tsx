import { useForm } from "react-hook-form";
import { useDocumentData, useDocument } from "react-firebase-hooks/firestore";

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
}

interface FormData {
    answer: string;
}

const HabitContent: React.FC<P> = ({ selectedCategory }) => {
    const data = useHabitData(selectedCategory);
    const { uid } = useUser();
    const { date } = useDate();
    // const { handleSubmit, register, errors, reset } = useForm<FormData>();

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

            if (b) alert("Great job! Keep up the good work!");
            else alert("Don't worry about it! You can try again tomorrow!");
    };
    // const onSubmit = (data: FormData) => {
    //     firestore
    //         .collection("users")
    //         .doc(uid)
    //         .collection("habits")
    //         .doc("categories")
    //         .collection(selectedCategory)
    //         .doc(`${date.getMonth() + 1}-${date.getFullYear()}`)
    //         .set(
    //             {
    //                 [date.getDate()]: data.answer == "true" ? true : false,
    //             },
    //             { merge: true }
    //         );

    //         if (data.answer == "true") alert("Great job! Keep up the good work!");
    //         else alert("Don't worry about it! You can try again tomorrow!");
    // };

    return (
        <div className="md:h-5/6">
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
                            onClick={() => handleClick(true) }
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
                            onClick={() => handleClick(false) }

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
    );
};

export default HabitContent;
