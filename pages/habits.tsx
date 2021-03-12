import { useEffect, useState } from "react";
import {
    useDocumentData,
    useDocument,
    useCollection,
} from "react-firebase-hooks/firestore";

import { firestore } from "../config/firebase";
import HabitContent from "../components/Habits/HabitContent";
import AddHabitForm from "../components/Input/Habits/AddHabitForm";
import { useHabitCategoriesRef } from "../hooks/firestoreHooks";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const useHabitCategories = () => {
    // console.log("READING");
    const categoriesRef = useHabitCategoriesRef();
    const [value, loading, error] = useDocumentData(
        // firestore
        //     .collection("users")
        //     .doc(uid)
        //     .collection('habits')
        //     .doc('categories')
        categoriesRef
    );

    return value;
};

const Habits: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const categories = useHabitCategories();

    useEffect(() => {
        if (categories) {
            setSelectedCategory(Object.values(categories)[0]);
        }
    }, [categories]);

    // console.log(useHabitData(categories));

    return (
        <div className="flex flex-col md:flex-row m-5 md:m-0">
            <Sidebar />
            <div className="w-full md:m-5">
                <Navbar />
                <div className="my-4 p-3 bg-card rounded-lg md:w-1/3">
                    <h1 className="text-green-500 font-bold">Track Your Habits</h1>
                    <p>Each day you complete your goal, mark it in the calendar, and track your progress!</p>
                    <p>If you don't complete it one day, don't worry!</p>
                    <p>The bluer the calendar, the better!</p>
                 </div>
                <div className="flex flex-col md:flex-row">
                    <div className="flex md:flex-col m-5">
                        <AddHabitForm />
                        <div>
                            <h1 className="text-lg text-green-500 mt-4 ">Your Habits</h1>
                            {categories &&
                                Object.values(categories).map((category, idx) => {
                                    return (
                                        <p
                                            key={idx}
                                            onClick={() => {
                                                setSelectedCategory(category);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {category}
                                        </p>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="flex flex-col m-5 w-1/2">
                        {selectedCategory && (
                            <h1 className="text-xl text-green-500">
                                Did you {selectedCategory} today?
                            </h1>
                        )}
                        {selectedCategory && (
                            <HabitContent selectedCategory={selectedCategory} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Habits;
