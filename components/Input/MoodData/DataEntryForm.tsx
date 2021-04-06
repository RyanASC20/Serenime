import React from 'react';
import { useForm } from "react-hook-form";
import Zoom from 'react-reveal/Zoom';

import { useCurrentDayRef } from '../../../hooks/firestoreHooks';
import Button from "../../Button";
import MoodRadioGroup from "./MoodRadioGroup";
import TimePeriodRadioGoup from "./TimePeriodRadioGroup";
import { AllEntries } from '../../../Types/MoodData';

interface Props {
    currentData: AllEntries;
    setCreationMode?: React.Dispatch<React.SetStateAction<boolean>>;
    setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
    entryIndex?: number;
}

interface InputData {
    description: string;
    mood: number;
    timePeriod: string;
}

const DataEntryForm: React.FC<Props> = ({
    currentData,
    setCreationMode,
    setEditMode,
    entryIndex,
}) => {
    const dbRef = useCurrentDayRef();

    const { register, handleSubmit, reset } = useForm<InputData>();

    const handleCreateSubmit = (data: InputData) => {
        if (currentData) {
            dbRef.set({
                descriptions: [
                    {
                        timePeriod: data.timePeriod,
                        description: data.description,
                    },
                    ...currentData.descriptions,
                ],
                moods: [
                    { timePeriod: data.timePeriod, mood: data.mood },
                    ...currentData.moods,
                ],
            });
        } else {
            dbRef.set({
                descriptions: [
                    {
                        timePeriod: data.timePeriod,
                        description: data.description,
                    },
                ],
                moods: [{ timePeriod: data.timePeriod, mood: data.mood }],
            });
        }

        setCreationMode(false);
    };

    const handleEditSubmit = (data: InputData) => {
        dbRef.set({
            descriptions: [
                ...currentData.descriptions.slice(0, entryIndex),
                {
                    timePeriod: data.timePeriod,
                    description: data.description,
                },
                ...currentData.descriptions.slice(entryIndex + 1),
            ],
            moods: [
                ...currentData.moods.slice(0, entryIndex),
                { timePeriod: data.timePeriod, mood: data.mood },
                ...currentData.moods.slice(entryIndex + 1),
            ],
        });
        setEditMode(false);
    };

    const onSubmit = (data: InputData) => {
        if (setCreationMode) {
            handleCreateSubmit(data);
        }
        if (setEditMode) {
            handleEditSubmit(data);
        }
        reset();
    };

    const handleCancel = () => {
        if (setCreationMode) {
            setCreationMode(false);
        }
        if (setEditMode) {
            setEditMode(false);
        }
    };

    return (
        <Zoom duration={500}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-3 mt-4 bg-card rounded-lg w-full font-heading"
            >
                <p className="w-full p-2 my-2 rounded-md font-semibold text-md text-highlight-secondary">How are you?</p>
                <MoodRadioGroup register={register} />
                <p className="w-full p-2 my-2 rounded-md font-semibold text-md text-highlight-secondary">What have you been up to?</p>
                <textarea
                    name="description"
                    className="transition duration-200 p-2 resize-none w-full rounded-md border border-gray-300 font-sans text-sm focus:outline-none focus:border-green-500"
                    ref={register({
                        required: true,
                    })}
                ></textarea>
                <p className="w-full p-2 my-2 rounded-md font-semibold text-md text-highlight-secondary">When?</p>
                <TimePeriodRadioGoup register={register} />
                <div className="flex justify-between w-1/2">
                    <Button text="Add" hoverColor="green-300" textSize="md" />
                    <Button
                        text="Cancel"
                        type="button"
                        hoverColor="red-600"
                        textSize="md"
                        onClick={handleCancel}
                    />
                </div>
            </form>
        </Zoom>
    );
};

export default DataEntryForm;
