import { useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
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
    const [ monthlyValues, setMonthlyValues ] = useState(tmp);


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
        } catch(err) {
            console.log(err);
        }
    }, [value]);

    // console.log(monthlyValues.current);

    return monthlyValues;
};

export default function Index() {
    const user = useUser();
    const monthlyData = useMonthlyData();

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
        <div className="flex flex-col md:flex-row m-5 md:m-0">
            <Sidebar />
            <div className="w-full md:m-5">
                <Navbar />
                <div className="flex flex-col md:m-5 lg:flex-row lg:justify-between">
                    <Calendar type="mood" data={ monthlyData }/>
                    <div className="lg:w-1/2">
                        <h2 className="mt-4 text-center text-green-600 font-heading text-xl font-light">{`${
                            monthNames[date.getMonth()]
                        } ${date.getDate()}, ${date.getFullYear()}`}</h2>

                        { user && <DataEntries /> }
                    </div>
                </div>
            </div>
        </div>
        // <></>
    );
}
