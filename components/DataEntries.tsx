import { useEffect, useMemo, useState } from 'react';

import { useDocument } from 'react-firebase-hooks/firestore';
import { useCurrentDayRef } from '../hooks/firestoreHooks';
import Entry from './Entry';
import Button from './Button';
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
    const [ entriesByTime, setEntriesByTime ] = useState({
        "0": [],
        "1": [],
        "2": [],
        "3": []
    });

    useEffect(() => {
        if (entries) {
            const { descriptions, moods } = entries;
            const tmp = {
                "0": [],
                "1": [],
                "2": [],
                "3": []
            };;
            descriptions.forEach((item, idx) => {
                console.log(item.timePeriod, item)
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
            setEntriesByTime(tmp);
        }
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
                            className={`mt-6 mb-3 p-2 rounded-full shadow-double-sm bg-${timeIconBg[parseInt(key)]}`}
                        >
                            {timeIconElements[parseInt(key)]}
                        </div> }
                        { entriesByTime[key].map(entry => entry) }
                    </>
                )
            })}

            { !creationMode && <Button
                text="New Entry"
                textSize="lg"
                onClick={() => {
                    setCreationMode(true);
                }}
            />}
        </div>
    )
}

export default DataEntries;