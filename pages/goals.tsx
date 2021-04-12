import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import FlashMessage from "react-flash-message";
import { useRouter } from "next/router";
import firebase from 'firebase/app';

import Page from "../components/Layouts/Page";
import Tooltip from "../components/elements/Tooltip";
import { RecordGoal, GoalsList} from '../components/modules/Goals';
import AddGoalForm from "../components/modules/Forms/AddGoal/AddGoalForm";
import { useHabitCategoriesRef } from "../utils/firestoreHooks";
import Button from "../components/elements/Buttons/Button";
import { useUser } from "../context/useUser";


const useHabitCategories = () => {
    const categoriesRef = useHabitCategoriesRef();
    const [value, loading, error] = useDocumentData(categoriesRef);

    return value;
};

const Goals: React.FC = () => {
    const { uid } = useUser();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [creationMode, setCreationMode] = useState(false);
    const [submitted, setSubmitted] = useState<boolean | null>(null);
    const categoriesRef = useHabitCategoriesRef();
    const categories = useHabitCategories();
    const router = useRouter();

    useEffect(() => {
        if (!uid) {
            router.push("/login");
        }
    }, []);

    useEffect(() => {
        if (categories) {
            setSelectedCategory(Object.values(categories)[0]);
        }
    }, [categories]);

    useEffect(() => {
        if (submitted !== null) {
            setTimeout(() => {
                setSubmitted(null);
            }, 5000);
        }
    }, [submitted]);

    const handleRemove = (category: string): void => {
        const FieldValue = firebase.firestore.FieldValue;
        console.log(category, [category])
        categoriesRef
            .set({
                [category]: FieldValue.delete()
            }, { merge: true });
    }

    return (
        <>
            {uid && (
                <Page title="Goals">
                    <div className="flex flex-col md:ml-5 md:w-2/3">
                        <div className="mb-4 rounded-lg">
                            <h1 className="text-2xl inline tracking-wide text-gray-700">
                                Track Your Goals
                            </h1>
                            <Tooltip>
                                <p>
                                    Each day you complete your goal, mark it in
                                    the calendar, and track your progress!
                                </p>
                                <p>
                                    If you don't complete it one day, don't
                                    worry!
                                </p>
                                <p>The greener the calendar, the better!</p>
                            </Tooltip>
                        </div>
                        {selectedCategory && (
                            <>
                                <h1 className="text-xl text-highlight">
                                    Did you{" "}
                                    <span className="font-bold">
                                        {selectedCategory}
                                    </span>{" "}
                                    today?
                                </h1>
                                {submitted !== null && (
                                    <FlashMessage duration={5000}>
                                        <p className="p-3 my-5 rounded-lg text-white bg-highlight">
                                            {submitted
                                                ? "Great job! Keep up the good work!"
                                                : "Don't worry about it! Try again tomorrow."}
                                        </p>
                                    </FlashMessage>
                                )}
                                <RecordGoal
                                    selectedCategory={selectedCategory}
                                    setSubmitted={setSubmitted}
                                />
                            </>
                        )}
                    </div>
                    <div className="mt-5 md:mt-0 md:w-1/2">
                        <div>
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl inline tracking-wide text-gray-700">
                                    Your Goals
                            </h2>
                            {!creationMode && <Button
                                text="+ Add Goal"
                                bgcolor="highlight-secondary"
                                textSize="sm"
                                onClick={() => setCreationMode(true)}
                            />}
                            </div>
                            {creationMode &&
                                <AddGoalForm
                                    setCreationMode={setCreationMode}
                                />
                            }
                            {categories && (
                                <GoalsList categories={ Object.values(categories) } selectedCategory={ selectedCategory } setSelectedCategory={ setSelectedCategory } />
                            )}
                        </div>
                    </div>
                </Page>
            )}
        </>
    );
};

export default Goals;
