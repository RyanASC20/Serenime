import { useEffect, useState } from "react";
import Entry from "./Entry";
import { useUser } from "../hooks/useUser";
import DataEntryForm from "../components/Input/DataEntryForm";
import {
    timeIconElements,
    timeIconColors,
    timeIconBg,
    timeIcons,
} from "../public/static/icons";

interface P {
    date: string;
}

interface Data {
    timePeriod: number;
    description?: string;
    mood?: string;
}

const DataEntries: React.FC<P> = ({ date }) => {
    const { userData, entryData, entriesRef } = useUser();
    const [descriptions, setDescriptions] = useState<Data[]>([]);
    const [moods, setMoods] = useState<Data[]>([]);
    const [creationMode, setCreationMode] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setDescriptions(entryData.descriptions);
                setMoods(entryData.moods);
            } catch (err) {
                console.log(err);
                setDescriptions([]);
                setMoods([]);
            }
        };
        fetchData();
    }, [date, userData]);

    const handleRemove = (idx) => {
        entriesRef.set({
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

    // const entryItems: JSX.Element[] | null = descriptions.map(
    //     (obj, idx) => {
    //         console.log(obj);
    //         return <Entry key={ idx } description={ obj.description } idx={ idx } mood={ parseInt(moods[idx].mood) } handleRemove={ handleRemove } setCreationMode={ setCreationMode }></Entry>
    //     }
    // );
    descriptions.forEach((obj, idx) => {
        entryItemsByTimePeriod[obj.timePeriod].push(
            <Entry
                key={idx}
                description={obj.description}
                idx={idx}
                mood={parseInt(moods[idx].mood)}
                handleRemove={handleRemove}
                setCreationMode={setCreationMode}
            />
        );
    });

    return (
        <div className="mb-10">
            <button
                type="button"
                className="transition duration-500 p-2 bg-base-dark text-green-500 shadow-double-sm rounded-lg hover:shadow-inner focus:outline-none"
                onClick={() => setCreationMode(!creationMode)}
            >
                {creationMode ? <>Cancel</> : <>New Entry</>}
            </button>
            {creationMode && (
                <DataEntryForm setCreationMode={setCreationMode} />
            )}
            {/* {entryItems.length > 0 ? entryItems : (
                    <div className="mt-6 p-3 shadow-double-sm rounded-lg">
                        <h1 className="text-center text-2xl text-green-500">Words of Encouragement</h1>
                    </div>
                )} */}
            {entryItemsByTimePeriod["0"].length > 0 ? (
                <>
                    <div
                        className={`mt-10 mb-3 p-2 rounded-full shadow-double-sm bg-${timeIconBg[0]}`}
                    >
                        {timeIconElements[0]}
                    </div>
                    {entryItemsByTimePeriod["0"]}
                </>
            ) : (
                <></>
            )}

            {entryItemsByTimePeriod["1"].length > 0  ? (
                <>
                    <div
                        className={`mt-10 mb-5 p-2 rounded-full shadow-double-sm bg-${timeIconBg[1]}`}
                    >
                        {timeIconElements[1]}
                    </div>
                    {entryItemsByTimePeriod["1"]}
                </>
            ) : (
                <></>
            )}

            {entryItemsByTimePeriod["2"].length > 0  ? (
                <>
                    <div
                        className={`mt-10 mb-5 p-2 rounded-full shadow-double-sm bg-${timeIconBg[2]}`}
                    >
                        {timeIconElements[2]}
                    </div>
                    {entryItemsByTimePeriod["2"]}
                </>
            ) : (
                <></>
            )}

            {entryItemsByTimePeriod["3"].length > 0  ? (
                <>
                    <div
                        className={`mt-10 mb-5 p-2 rounded-full shadow-double-sm bg-${timeIconBg[3]}`}
                    >
                        {timeIconElements[3]}
                    </div>
                    {entryItemsByTimePeriod["3"]}
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default DataEntries;
