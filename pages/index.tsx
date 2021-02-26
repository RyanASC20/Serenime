import Navbar from "../components/Navbar";
import { useUser } from "../hooks/useUser";
import { useDate } from "../hooks/useDate";
import DataEntries from "../components/DataEntries";
import Calendar from "../components/Calendar";
import Quote from "../components/Quote";
import Sidebar from "../components/Sidebar/Sidebar";

// @refresh reset

import "react-datepicker/dist/react-datepicker.css";

export default function Index() {
    const { userData } = useUser();
    const [date] = useDate();
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
        <div className="flex flex-col md:flex-row w-full">
            <Sidebar />
            <div className="m-10 w-full">
                <Navbar />
                {/* <Quote /> */}
                <div className="flex flex-col md:flex-row justify-between md:m-5">
                    <Calendar date={date} />
                    <div className="md:w-1/2">
                        <h2 className="mt-4 text-center text-green-600 font-heading text-xl font-light">{`${
                            monthNames[date.getMonth()]
                        } ${date.getDate()}, ${date.getFullYear()}`}</h2>

                        {userData && (
                            <DataEntries
                                date={`${date.getFullYear()}-${
                                    date.getMonth() + 1
                                }-${date.getDate()}`}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
