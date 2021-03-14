import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Head from "next/head";
import { useRouter } from "next/router";

import { firestore } from "../config/firebase";
import Navbar from "../components/Navbar";
import { useUser } from "../hooks/useUser";
import { useDate } from "../hooks/useDate";
import DataEntries from "../components/DataEntries";
import Calendar from "../components/Calendar";
// import Quote from "../components/Quote";
import Sidebar from "../components/Sidebar";

import "react-datepicker/dist/react-datepicker.css";

const useMonthlyData = () => {
    const { uid } = useUser();
    const { date, dim } = useDate();
    const [value, loading, error] = useCollection(
        firestore
            .collection("users")
            .doc(uid)
            .collection(`${date.getMonth() + 1}-${date.getFullYear()}`)
    );
    let tmp = [];
    for (let i = 0; i < dim; i++) tmp.push(null);
    // const monthlyValues = useRef(tmp);
    const [monthlyValues, setMonthlyValues] = useState(tmp);

    useEffect(() => {
        try {
            value.forEach((doc) => {
                const data = doc.data();
                const moods = data.moods;
                if (moods.length > 0) {
                    const sum = moods.reduce((acc, cur) => {
                        return acc + parseInt(cur.mood);
                    }, 0);
                    const mean = sum / moods.length;
                    tmp[parseInt(doc.id)] = mean;
                }
            });
            setMonthlyValues(tmp);
        } catch (err) {
            // console.log(err);
        }
    }, [value]);

    return monthlyValues;
};

export default function Index() {
    const { uid } = useUser();
    const monthlyData = useMonthlyData();
    const router = useRouter();

    useEffect(() => {
        console.log(uid);
        if (!uid) {
            router.push("/login");
        }
    }, []);

    const { date } = useDate();
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <>
            <Head>
                <title>Serenime | Home</title>
            </Head>
            {uid && (
                <div className="bg-base">
                    <Navbar />
                    <div className="flex justify-center mx-2">
                        <div className="flex flex-col md:flex-row md:justify-between w-5/6 lg:w-3/4 md:m-0">
                            <Sidebar />
                            <div className="flex flex-col md:flex-row md:justify-around w-full h-screen md:border-l-2 md:border-r-2 md:border-gray-300 md:px-3 md:py-6 bg-white">
                                <div>
                                    <div className="mb-4 p-3 rounded-lg ">
                                        <h1 className="text-highlight font-bold">
                                            Track Your Mood
                                        </h1>
                                        <p>
                                            Enter events you did throughout the
                                            day and keep track of how you felt!
                                        </p>
                                        <p>
                                            Try to make the calendar as green as
                                            possible!
                                        </p>
                                    </div>
                                    <Calendar type="mood" data={monthlyData} />
                                </div>
                                <div className="md:w-2/5">
                                    <h2 className="mt-4 text-center text-green-600 font-heading text-xl font-light">{`${
                                        monthNames[date.getMonth()]
                                    } ${date.getDate()}, ${date.getFullYear()}`}</h2>
                                    <DataEntries />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

{
    /* // <div className="flex flex-col md:flex-row md:m-0">
        //     <Sidebar />
        //     <div className="w-full">
        //         <Navbar />
        //         <div className="flex flex-col m-2 md:m-5 lg:flex-row lg:justify-between">
        //             <div className="w-full lg:w-5/12 flex flex-col">
        //                 <div className="mb-4 p-3 bg-card rounded-lg ">
        //                     <h1 className="text-highlight font-bold">Track Your Mood</h1>
        //                     <p>Enter events you did throughout the day and keep track of how you felt!</p>
        //                     <p>Try to make the calendar as green as possible!</p>
        //                 </div>
        //                 <Calendar type="mood" data={ monthlyData }/>
        //             </div>
        //             <div className="lg:w-1/2">
        //                 <h2 className="mt-4 text-center text-green-600 font-heading text-xl font-light">{`${
        //                     monthNames[date.getMonth()]
        //                 } ${date.getDate()}, ${date.getFullYear()}`}</h2>

        //                 { user && <DataEntries /> }
        //             </div>
        //         </div>
        //     </div>
        // </div> */
}
