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
    const { handleSubmit, register, errors, reset } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        firestore
            .collection("users")
            .doc(uid)
            .collection("habits")
            .doc("categories")
            .collection(selectedCategory)
            .doc(`${date.getMonth() + 1}-${date.getFullYear()}`)
            .set(
                {
                    [date.getDate()]: data.answer == "true" ? true : false,
                },
                { merge: true }
            );

            if (data.answer == "true") alert("Great job! Keep up the good work!");
            else alert("Don't worry about it! You can try again tomorrow!");
    };

    return (
        <div className="md:h-5/6">
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <div className="flex my-5">
                    <div className="w-1/6">
                        <input
                            type="radio"
                            ref={(e) =>
                                register(e, {
                                    required: true,
                                })
                            }
                            id={"habit-yes"}
                            name="answer"
                            value={"true"}
                            className="w-0 h-0" 
                            onClick={() => { console.log("klasdjfklasjdklfjasdkl;fasjklfasdkl"); }}
                        ></input>
                        <label
                            className={`transition transition-duration-250 p-3 rounded-lg text-lg font-light cursor-pointer border-2 border-card hover:border-secondary `}
                            htmlFor={'habit-yes'}
                        >
                            Yes
                        </label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            ref={(e) =>
                                register(e, {
                                    required: true,
                                })
                            }
                            id={"habit-no"}
                            name="answer"
                            value={"false"}
                            className="w-0 h-0"
                            onClick={() => { console.log("no"); }}
                        ></input>
                        <label
                            className={`transition transition-duration-250 p-3 rounded-lg text-lg font-light cursor-pointer border-2 border-card hover:border-secondary`}
                            htmlFor={'habit-no'}
                        >
                            No
                        </label>
                    </div>
                </div>
                
                <Button type="submit" text="Confirm" />
            </form>
            <Calendar type="habit" data={data} />
        </div>
    );
};

export default HabitContent;
