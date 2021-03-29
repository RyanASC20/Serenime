import React from 'react';
import { useForm } from "react-hook-form";
import Zoom from 'react-reveal/Zoom';

import { useCurrentDayRef } from '../../../hooks/firestoreHooks';
import Button from "../../Button";
import MoodRadioGroup from "./MoodRadioGroup";
import TimePeriodRadioGoup from "./TimePeriodRadioGroup";
import { allEntries } from '../../../Types/MoodData';

interface Props {
    currentData: allEntries;
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
                className="p-3 mt-4 bg-card rounded-lg w-full"
            >
                <h2 className="font-light">How are you?</h2>
                <MoodRadioGroup register={register} />
                <h2 className="font-thin">What have you been up to?</h2>
                <textarea
                    name="description"
                    className="transition duration-200 p-2 resize-none w-full bg-base border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                    ref={register({
                        required: true,
                    })}
                ></textarea>
                <h2 className="font-light">When?</h2>
                <TimePeriodRadioGoup register={register} />
                <div className="flex justify-between w-1/2">
                    <Button text="Submit" hoverColor="green-300" textSize="lg" />
                    <Button
                        text="Cancel"
                        type="button"
                        hoverColor="red-600"
                        textSize="lg"
                        onClick={handleCancel}
                    />
                </div>
            </form>
        </Zoom>
    );
};

export default DataEntryForm;
