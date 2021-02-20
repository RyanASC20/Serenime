import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { iconElements } from "../public/static/icons";
import DataEntryForm from "../components/Input/DataEntryForm";

interface P {
    date: string;
}

const DataEntries: React.FC<P> = ({ date }) => {
    const { userData, entryData } = useUser();
    const [descriptions, setDescriptions] = useState<string[]>([]);
    const [moods, setMoods] = useState<number[]>([]);
    const [creationMode, setCreationMode] = useState<boolean>(false);

    try {
        useEffect(() => {
            const fetchData = async () => {
                console.log("FETCHING");

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

        console.log(moods);

        const entryItems: JSX.Element[] | null = descriptions.map(
            (description, idx) => {
                console.log("running map");
                return (
                    <div
                        className="mt-6 p-3 shadow-double-xs rounded-lg"
                        key={idx}
                    >
                        {iconElements[moods[idx]]}
                        <p>{description}</p>
                    </div>
                );
            }
        );

        return (
            <div className="mb-10">
                <button
                    type="button"
                    className="p-2 text-green-500 shadow-double-xs rounded-lg hover:shadow-inner focus:outline-none"
                    onClick={() => setCreationMode(!creationMode)}
                >
                    {creationMode ? <>Cancel</> : <>New Entry</>}
                </button>
                {creationMode && (
                    <DataEntryForm
                        setCreationMode={setCreationMode}
                        descriptions={descriptions}
                        moods={moods}
                    />
                )}
                {entryItems}
            </div>
        );
    } catch (err) {
        console.log(err);
        return (
            <>
                {/* <button
                    type="button"
                    className="p-2 text-green-500 shadow-double-xs rounded-lg hover:shadow-inner focus:outline-none"
                    onClick={() => setCreationMode(!creationMode)}
                >
                    {creationMode ? <>Cancel</> : <>New Entry</>}
                </button>
                {creationMode && (
                    <DataEntryForm
                        setCreationMode={setCreationMode}
                        descriptions={descriptions}
                        moods={moods}
                    />
                )} */}
            </>
        );
    }
};

export default DataEntries;
