import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

import { firestore } from "../config/firebase";
import Page from "../components/Page";
import Footer from '../components/Footer';
import Tooltip from "../components/Tooltip";
import { useUser } from "../hooks/useUser";
import { useDate } from "../hooks/useDate";
import DataEntries from "../components/DataEntries";
import Calendar from "../components/Calendar";
import MoodGraph from '../components/MoodGraph';
import { AllEntries } from '../Types/MoodData';

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

interface MonthlyEntries {
    monthlyData: AllEntries[];
}
export default function Index() {
    const { uid } = useUser();
    const monthlyData: AllEntries[] = useMonthlyData();
    const router = useRouter();

    useEffect(() => {
        if (!uid) {
            router.push("/login");
        }
    }, []);

    return (
        <>
            {uid && (
                <Page title="Home">
                    <div className="w-full md:w-1/2">
                        {/* <div className="border border-black mb-4 rounded-lg "> */}
                        <div>
                            <h1 className="text-2xl inline tracking-wide text-gray-700">
                                Track Your Mood
                                </h1>
                            <Tooltip>
                                <p>
                                    Enter events you did throughout the day
                                    and keep track of how you felt!
                                    </p>
                                <p>
                                    Try to make the calendar as green as
                                    possible!
                                    </p>
                            </Tooltip>
                            {/* </div> */}

                            <Calendar type="mood" data={monthlyData} />
                            <MoodGraph data={
                                Object.values(monthlyData).map(e => { 
                                    if (e === null) {
                                        return 0; 
                                    } 
                                    return e;  
                                }) as number[]
                            } />
                        </div>
                    </div>
                    <div className="md:w-2/5">
                        <DataEntries />
                    </div>
                </Page>
            )}
        </>
    );
}
