import Navbar from "../components/Navbar";
import { useUser } from "../hooks/useUser";
import { useDate } from "../hooks/useDate";
import DataEntries from "../components/DataEntries";
import Calendar from "../components/Calendar";
import Quote from "../components/Quote";

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
        <div className="ml-10 mt-10 mr-10 flex-auto">
            <Navbar />
            <Quote />
            <div className="mt-3 p-2 h-72 bg-base-dark shadow-double-md rounded-lg text-center">
                <Calendar date={ date }/>
            </div>
            <h2 className="mt-4 mb-4 text-center text-green-600 font-heading text-xl font-light">{ `${ monthNames[date.getMonth()] } ${ date.getDate() }, ${ date.getFullYear() }` }</h2>
            {userData && (  
                <DataEntries
                    date={`${date.getFullYear()}-${
                        date.getMonth() + 1
                    }-${date.getDate()}`}
                />
            )}
        </div>
    );
}
