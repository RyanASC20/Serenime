import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import Entry from "./Entry";
import Button from "./Button";
import { useDate } from "../hooks/useDate";
import { useCurrentDayRef } from "../hooks/firestoreHooks";
import DataEntryForm from "./Input/MoodData/DataEntryForm";
import {
    timeIconElements,
    timeIconBg,
} from "../public/static/icons";

const useData = () => {
    const [value, loading, error] = useDocumentData(useCurrentDayRef());
    return value;
};

interface Data {
    timePeriod?: number;
    description?: string;
    mood?: string;
}

const DataEntries: React.FC = () => {
    const { date } = useDate();
    const data = useData();
    const dbRef = useCurrentDayRef();

    const [descriptions, setDescriptions] = useState<Data[]>([]);
    const [moods, setMoods] = useState<Data[]>([]);
    const [creationMode, setCreationMode] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            if (data) {
                setDescriptions(data.descriptions);
                setMoods(data.moods);
            }
            else {
                setDescriptions([]);
                setMoods([]);
            }
        };
        fetchData();
    }, [date, data]);

    const handleRemove = (idx) => {
        dbRef.set({
            descriptions: [
                ...descriptions.slice(0, idx),
                ...descriptions.slice(idx + 1),
            ],
            moods: [...moods.slice(0, idx), ...moods.slice(idx + 1)],
        });
    };

    const entryItemsByTimePeriod = {
        "0": [],
        "1": [],
        "2": [],
        "3": [],
    };

    descriptions.forEach((obj, idx) => {
        entryItemsByTimePeriod[obj.timePeriod].push(
            <Entry
                key={idx}
                description={obj.description}
                idx={idx}
                mood={parseInt(moods[idx].mood)}
                handleRemove={handleRemove}
                setCreationMode={setCreationMode}
                currentData={data}
            />
        );
    });

    return (
        <div className="flex flex-col items-center w-full">
            {creationMode && (
                <DataEntryForm
                    setCreationMode={setCreationMode}
                    currentData={data}
                />
            )}

            {entryItemsByTimePeriod["0"].length > 0 ? (
                <>
                    <div
                        className={`mt-6 mb-3 p-2 rounded-full shadow-double-sm bg-${timeIconBg[0]}`}
                    >
                        {timeIconElements[0]}
                    </div>
                    {entryItemsByTimePeriod["0"]}
                </>
            ) : (
                <></>
            )}

            {entryItemsByTimePeriod["1"].length > 0 ? (
                <>
                    <div
                        className={`mt-6 mb-5 p-2 rounded-full shadow-double-sm bg-${timeIconBg[1]}`}
                    >
                        {timeIconElements[1]}
                    </div>
                    {entryItemsByTimePeriod["1"]}
                </>
            ) : (
                <></>
            )}

            {entryItemsByTimePeriod["2"].length > 0 ? (
                <>
                    <div
                        className={`mt-6 mb-5 p-2 rounded-full shadow-double-sm bg-${timeIconBg[2]}`}
                    >
                        {timeIconElements[2]}
                    </div>
                    {entryItemsByTimePeriod["2"]}
                </>
            ) : (
                <></>
            )}

            {entryItemsByTimePeriod["3"].length > 0 ? (
                <>
                    <div
                        className={`mt-6 mb-5 p-2 rounded-full shadow-double-sm bg-${timeIconBg[3]}`}
                    >
                        {timeIconElements[3]}
                    </div>
                    {entryItemsByTimePeriod["3"]}
                </>
            ) : (
                <></>
            )}
            { !creationMode && <Button
                text="New Entry"
                textSize="lg"
                onClick={() => {
                    setCreationMode(true);
                }}
            /> }
        </div>
    );
};

export default DataEntries;
