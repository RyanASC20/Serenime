import firebase from 'firebase/app';
import Link from 'next/link';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from "react-hook-form";
import Zoom from 'react-reveal/Zoom';

import { firestore } from '../../config/firebase';
import { useUser } from '../../hooks/useUser';
import Button from '../Button';
import { deleteIconElement } from '../../public/static/icons';
import { useEffect, useState } from 'react';


const timeLeftColor = (currentTime: string) => {
    const d = new Date();
    const hours: number = parseInt(currentTime.split(':')[0]);
    const minutes: number = parseInt(currentTime.split(':')[1]);
    const difference: number = ((hours === 0 ? 12 : hours) * 60 + minutes) - (d.getHours() * 60 + d.getMinutes());

    // console.log(d.getHours(), d.getMinutes(), hours, minutes)
    if (difference > 90) return "bg-green-500";
    else if (difference > 60) return "bg-yellow-300";
    else if (difference > 30) return "bg-yellow-500";
    return "bg-red-500";
}


const cleanTime = (time: string) => {
    const hours: number = parseInt(time.split(':')[0]);
    const minutes: number = parseInt(time.split(':')[1]);

    return `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${hours > 12 ? "PM" : "AM"}`;
}


const useRoutineData = (timePeriod) => {
    const { uid } = useUser();
    try {
        const [value, loading, error] = useDocumentData(
            firestore
                .collection('users')
                .doc(uid)
                .collection('routines')
                .doc(timePeriod)
        );
        
        const toMinutes = (time: string) => parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]); 
        
        const sortedKeys = value ? Object.keys(value).sort((a, b) => toMinutes(value[a].time) - toMinutes(value[b].time)) : null

        return {data: { ...value, "Breathing": false }, sortedKeys};
    } catch (err) {
        console.log(err);
    }
}

interface Props {
    timePeriod: string;
}

const Routine: React.FC<Props> = ({ timePeriod }) => {
    const { uid } = useUser();
    const { handleSubmit, register, reset } = useForm();
    const {data, sortedKeys} = useRoutineData(timePeriod);
  
    const onSubmit = (data) => {
        firestore
            .collection('users')
            .doc(uid)
            .collection('routines')
            .doc(timePeriod)
            .set({
                [data.newTodo]: { state: false, time: data.time }
            }, { merge: true });
        reset();
    };

    const handleChange = (item, value, time) => {
        firestore
            .collection('users')
            .doc(uid)
            .collection('routines')
            .doc(timePeriod)
            .set({
                [item]: { state: value, time }
            }, { merge: true });
    }

    const handleRemove = (item) => {
        const FieldValue = firebase.firestore.FieldValue;
        firestore
            .collection('users')
            .doc(uid)
            .collection('routines')
            .doc(timePeriod)
            .set({
                [item]: FieldValue.delete()
            }, { merge: true });
    }


    return (
        <Zoom duration={300}>
            <div className="bg-card p-5 rounded-md w-full h-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full mb-3">
                    <h2 className="w-full p-2 mt-6 rounded-md font-semibold text-md text-highlight-secondary">Add item:</h2>
                    <input
                        name="newTodo"
                        ref={register({
                            required: true
                        })}
                        className="transition duration-300 p-1 my-2 bg-card border-b border-gray-400 focus:border-highlight focus:outline-none"
                        autoComplete="off"
                        placeholder="Add item: "
                    >
                    </input>
                    <h2 className="w-full p-2 mt-10 rounded-md font-semibold text-md text-highlight-secondary">Enter a deadline: </h2>
                    <input
                        type="time"
                        name="time"
                        ref={register({
                            required: true
                        })}
                        className="transition duration-300 p-1 my-2 bg-card border-b border-gray-400 focus:border-highlight focus:outline-none"
                        autoComplete="off"
                    >
                    </input>
                    <div className="mt-4 w-full">
                        <Button text="Add" />
                    </div>
                </form>
                {sortedKeys && (
                    sortedKeys.map((key, idx) => {
                        return (
                            <div
                                className="flex justify-between items-center p-3"
                                key={idx}
                            >
                                { key == "Breathing" ?
                                    <Link href="/breathing">
                                        <a href="#" className="text-blue-500">Breathing Exercise</a>
                                    </Link>
                                    : <>
                                        <p
                                            className={`transition duration-200 cursor-pointer p-3 rounded-lg ${data[key].state ? 'line-through text-gray-400' : timeLeftColor(data[key].time) }`}
                                            onClick={() => { handleChange(key, !data[key].state, data[key].time ) }}
                                        >
                                            {key} (By {cleanTime(data[key].time)})
                                        </p>
                                        <p className="transition duration-200 cursor-pointer text-gray-400 hover:text-red-500" onClick={() => { handleRemove(key) }}>{deleteIconElement}</p>
                                    </>
                                }
                            </div>
                        )
                    })
                )}
            </div>
        </Zoom>
    );
};

export default Routine;
