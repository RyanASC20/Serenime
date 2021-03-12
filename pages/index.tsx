import Navbar from "../components/Navbar";
import { useUser } from "../hooks/useUser";
import { useDate } from "../hooks/useDate";
import DataEntries from "../components/DataEntries";
import Calendar from "../components/Calendar";
import Quote from "../components/Quote";
import Sidebar from "../components/Sidebar";

// @refresh reset

import "react-datepicker/dist/react-datepicker.css";

export default function Index() {
    const { userData, monthlyData } = useUser();

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
        <div className="flex flex-col md:flex-row m-5 md:m-0">
            <Sidebar />
            <div className="w-full md:m-5">
                <Navbar />
                <div className="flex flex-col md:m-5 lg:flex-row lg:justify-between">
                    <Calendar type="mood" data={ monthlyData }/>
                    <div className="lg:w-1/2">
                        <h2 className="mt-4 text-center text-green-600 font-heading text-xl">{`${
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
        // <div className="m-5 md:flex md:flex-col">
        //     <Sidebar />
        //     <div>

        //         <Navbar />
        //         <Calendar />
        //         <div className="lg:w-1/2">
        //             <h2 className="mt-4 text-center text-green-600 font-heading text-xl font-light">{`${monthNames[date.getMonth()]
        //                 } ${date.getDate()}, ${date.getFullYear()}`}</h2>

        //             {userData && (
        //                 <DataEntries
        //                     date={`${date.getFullYear()}-${date.getMonth() + 1
        //                         }-${date.getDate()}`}
        //                 />
        //             )}
        //         </div>
        //     </div>
        // </div>

    );
}
