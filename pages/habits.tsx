import { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import FlashMessage from "react-flash-message";
import Head from "next/head";

import HabitContent from "../components/Habits/HabitContent";
import AddHabitForm from "../components/Input/Habits/AddHabitForm";
import { useHabitCategoriesRef } from "../hooks/firestoreHooks";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Button from "../components/Button";

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
    const [creationMode, setCreationMode] = useState(false);
    const [submitted, setSubmitted] = useState(null);
    const categories = useHabitCategories();

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

    return (
        <>
            <Head>
                <title>Serenime | Habits</title>
            </Head>
            <div className="bg-base">
                <Navbar />

                <div className="flex justify-center mx-2">
                    <div className="flex flex-col md:flex-row md:justify-evenly w-5/6 lg:w-3/4 md:m-0">
                        <Sidebar />
                        <div className="flex flex-col lg:flex-row md:justify-around w-full h-screen md:border-l-2 md:border-r-2 md:border-gray-300 md:px-5 md:py-6 bg-white">
                            <div className="md:w-1/4">
                                <div className="mb-4 rounded-lg">
                                    <h1 className="text-highlight font-bold">
                                        Track Your Habits
                                    </h1>
                                    <p>
                                        Each day you complete your goal, mark it
                                        in the calendar, and track your
                                        progress!
                                    </p>
                                    <p>
                                        If you don't complete it one day, don't
                                        worry!
                                    </p>
                                    <p>The greener the calendar, the better!</p>
                                </div>
                                <div>
                                    <h1 className="text-lg text-highlight mr-4 inline ">
                                        Your Habits
                                    </h1>
                                    {creationMode ? (
                                        <AddHabitForm />
                                    ) : (
                                        <Button
                                            text="+"
                                            textSize="lg"
                                            onClick={() =>
                                                setCreationMode(true)
                                            }
                                        />
                                    )}

                                    {categories && (
                                        <Fade bottom cascade duration={500}>
                                            {Object.values(categories).map(
                                                (category, idx) => {
                                                    return (
                                                        <p
                                                            key={idx}
                                                            onClick={() => {
                                                                setSelectedCategory(
                                                                    category
                                                                );
                                                            }}
                                                            className={`cursor-pointer p-1.5 ${
                                                                selectedCategory ==
                                                                category
                                                                    ? "border-l-4 border-highlight bg-base"
                                                                    : ""
                                                            } hover:bg-base`}
                                                        >
                                                            {category}
                                                        </p>
                                                    );
                                                }
                                            )}
                                        </Fade>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col md:ml-5 md:w-2/3">
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
                                            <Zoom right duration={300}>
                                                <FlashMessage duration={5000}>
                                                    <p className="p-3 my-5 rounded-lg text-white bg-highlight">
                                                        {submitted
                                                            ? "Great job! Keep up the good work!"
                                                            : "Don't worry about it! Try again tomorrow."}
                                                    </p>
                                                </FlashMessage>
                                            </Zoom>
                                        )}
                                        <HabitContent
                                            selectedCategory={selectedCategory}
                                            setSubmitted={setSubmitted}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Habits;

{
    /* // <div className="flex flex-col md:flex-row m-5 md:m-0">
        //     <Sidebar />
        //     <div className="w-full md:m-5">
        //         <Navbar />
        //         <div className="my-4 p-3 bg-card rounded-lg md:w-1/2">
        //             <h1 className="text-highlight font-bold">Track Your Habits</h1>
        //             <p>Each day you complete your goal, mark it in the calendar, and track your progress!</p>
        //             <p>If you don't complete it one day, don't worry!</p>
        //             <p>The bluer the calendar, the better!</p>
        //          </div>
        //         <div className="flex flex-col md:flex-row">
        //             <div className="flex md:flex-col m-1">
        //                 <AddHabitForm />
        //                 <div>
        //                     <h1 className="text-lg text-highlight mt-4 ">Your Habits</h1>
        //                     {categories &&
        //                         Object.values(categories).map((category, idx) => {
        //                             return (
        //                                 <p
        //                                     key={idx}
        //                                     onClick={() => {
        //                                         setSelectedCategory(category);
        //                                     }}
        //                                     className="cursor-pointer"
        //                                 >
        //                                     {category}
        //                                 </p>
        //                             );
        //                         })}
        //                 </div>
        //             </div>
        //             <div className="flex flex-col ml-5 w-1/2">
        //                 {selectedCategory && (
        //                     <h1 className="text-xl text-highlight">
        //                         Did you {selectedCategory} today?
        //                     </h1>
        //                 )}
        //                 {selectedCategory && (
        //                     <HabitContent selectedCategory={selectedCategory} />
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </div> */
}
