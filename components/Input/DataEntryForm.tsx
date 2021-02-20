import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/useUser";
import MoodRadioGroup from "./MoodRadioGroup";

interface P {
    setCreationMode: any;
    descriptions: string[];
    moods: number[];
}

interface inputData {
    description: string;
    mood: number;
}

const DataEntryForm: React.FC<P> = ({
    setCreationMode,
    descriptions,
    moods,
}) => {
    const { entriesRef } = useUser();
    const { register, handleSubmit, reset, errors } = useForm<inputData>();



    const onSubmit = (data: inputData) => {
        entriesRef.set({
            descriptions: [data.description, ...descriptions, ],
            moods: [data.mood, ...moods, ],
        });
        reset();
        setCreationMode(false);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-3 mt-4 shadow-double-sm rounded-lg"
        >
            <h2>How are you?</h2>
            <MoodRadioGroup register={ register }/>
            <h2>What have you been up to?</h2>
            <textarea
                name="description"
                className="pd-2 resize-none w-full bg-base border-2 border-gray-300 rounded-md focus:outline-none"
                ref={register({
                    required: true,
                })}
            ></textarea>
            <button
                type="submit"
                className="p-2 text-green-500 shadow-double-xs rounded-lg hover:shadow-inner"
            >
                Save
            </button>
        </form>
    );
};

export default DataEntryForm;
