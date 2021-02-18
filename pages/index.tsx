import { useState } from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { useUser } from "../hooks/useUser";
import { useDate } from "../hooks/useDate";
import { auth } from "../config/firebase";
import Graph from "../components/Graph";
import DatePicker from "react-datepicker";
import DataEntries from "../components/DataEntries";
import DataEntryForm from '../components/Input/DataEntryForm';
import { useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";

export default function Index() {
    const { user, userData } = useUser();
    const [ date, setDate ] = useDate();


    return (
        <div className="ml-10 mt-10 mr-10 flex-auto">
            {user && userData && (
                <h1 className="text-3xl">Welcome Back, {user.name}</h1>
            )}
            <Navbar />
            {user && userData && (
                // <Link href="/create-entry">
                //     <a className="block text-blue-600">Create Entry</a>
                // </Link>
              <DataEntryForm date={ `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` }/>
            )}

            <DatePicker
                className="block border border-gray-800"
                selected={ date }
                onChange={(date) => {
                    setDate(date);
                }}
            />

            {user && userData && <DataEntries date={ `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` } />}
            {/* { user && userData && <Graph /> } */}
        </div>
    );
}
