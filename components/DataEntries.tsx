import { useEffect, useMemo, useState } from 'react';

import { useDocument } from 'react-firebase-hooks/firestore';
import { useCurrentDayRef } from '../hooks/firestoreHooks';
import Entry from './Entry';
import Button from './Buttons/Button';
import DataEntryForm from './Input/MoodData/DataEntryForm';
import { timeIconElements, timeIconBg } from '../public/static/icons';
import { AllEntries } from '../Types/MoodData';


type fetchedData = AllEntries | undefined;

const getEntries = (): fetchedData => {
    const currentDayRef = useCurrentDayRef();
    const [value] = useDocument(currentDayRef);
    const valueMemo = useMemo(() => {
        if (!value) return undefined;
        return value.data() as fetchedData;
    }, [value]);

    return valueMemo;
    // if (value) {
    //     const data = value.data();
    //     return data as fetchedData;
    // }
    // return undefined;
}


const DataEntries: React.FC = () => {
    const entries = getEntries();
    const currentDayRef = useCurrentDayRef();
    const [creationMode, setCreationMode] = useState(false);
    const [entriesByTime, setEntriesByTime] = useState({
        "0": [],
        "1": [],
        "2": [],
        "3": []
    });

    useEffect(() => {
        console.log("entries changed")
        const tmp = {
            "0": [],
            "1": [],
            "2": [],
            "3": []
        };
        if (entries) {
            const { descriptions, moods } = entries;

            descriptions.forEach((item, idx) => {
                tmp[item.timePeriod].push(
                    <Entry
                        key={idx}
                        description={item.description}
                        idx={idx}
                        mood={parseInt(moods[idx].mood)}
                        handleRemove={removeEntry}
                        setCreationMode={setCreationMode}
                        currentData={entries}
                    />
                );
            });
        }
        setEntriesByTime(tmp);

    }, [entries]);



    const removeEntry = (idx: number) => {
        const { descriptions, moods } = entries;
        currentDayRef.set({
            descriptions: [
                ...descriptions.slice(0, idx),
                ...descriptions.slice(idx + 1),
            ],
            moods: [...moods.slice(0, idx), ...moods.slice(idx + 1)],
        });
    }


    return (
        <div className="flex flex-col items-center w-full">

            <div className="flex justify-between items-center w-full mb-3 mt-5 md:mt-0">
                <h2 className="text-xl inline tracking-wide text-gray-700">
                    Today's Entries:
                </h2>
                {!creationMode && <Button
                    text="+ New Entry"
                    bgcolor="highlight-secondary"
                    textSize="sm"
                    onClick={() => {
                        setCreationMode(true);
                    }}
                />}
            </div>

            {creationMode && (
                <DataEntryForm
                    setCreationMode={setCreationMode}
                    currentData={entries}
                />
            )}

            { Object.keys(entriesByTime).map((key: string) => {
                return (
                    <>
                        {entriesByTime[key].length > 0 && <div
                            className={`my-3 p-2 rounded-full shadow-double-sm bg-${timeIconBg[parseInt(key)]}`}
                        >
                            {timeIconElements[parseInt(key)]}
                        </div>}
                        { entriesByTime[key].map(entry => entry)}
                    </>
                )
            })}
        </div>
    )
}

export default DataEntries;