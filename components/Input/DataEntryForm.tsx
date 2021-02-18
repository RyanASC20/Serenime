import { useState, useRef, ReactElement } from "react";
import { useForm } from "react-hook-form";
// import { firestore } from '../../config/firebase';
import { useUser } from '../../hooks/useUser';
import Entry from "./Entry";


interface P {
    date: string;
}

interface inputData {
    entryInput: string;
    stressLevelInput: number;
}

export interface entryData {
    timestamp: Array<Date>;
    stressLevel: number;
    content: string;
}

const DataEntryForm: React.FC<P> = ({ date }) => {
    const { handleSubmit, register, reset, errors } = useForm<inputData>();
    const [entries, setEntries] = useState<Array<entryData>>([]);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const { userDataRef } = useUser();

    console.log(date);

    // const t = new Date();
    // const datevalues: number[] = [
    //     t.getFullYear(),
    //     t.getMonth() + 1,
    //     t.getDate(),
    //     t.getHours(),
    //     t.getMinutes(),
    //     t.getSeconds(),
    // ];


    // const [y, m, d]: number[] = datevalues;


    const update = (e, idx, type) => {
        if (type === 'entry') {
            setEntries([
                ...entries.slice(0, idx),
                {timestamp: entries[idx].timestamp, stressLevel: 5, content: e.target.value},
                ...entries.slice(idx + 1),
            ]);
        } else if (type === 'stressLevel') {
            setEntries([
                ...entries.slice(0, idx),
                {timestamp: entries[idx].timestamp, stressLevel: e.target.value, content: entries[idx].content},
                ...entries.slice(idx + 1),
            ]);
        }

    };

    const remove = (idx) => {
        setEntries([...entries.slice(0, idx), ...entries.slice(idx+1)]);
    }

    const onSubmit = (data: inputData) => {
        inputRef.current.focus();
        reset({ stressLevelInput: data.stressLevelInput })

        setEntries([
            { timestamp: [ new Date() ], stressLevel: data.stressLevelInput, content: data.entryInput },
            ...entries,
        ]);
    };

    const onSave = () => {
        if (entries.length > 0) {
            console.log(date);
            userDataRef.doc(date).set({
                contents: entries.map(entry => entry.content),
                stressLevel: entries.map(entry => entry.stressLevel)
            });
        }
    }

    const entriesItems: Array<ReactElement> = entries.map((entry, key) => {
        return (
            <Entry
                key={key}
                nameKey={key}
                update={update}
                register={ register }
                timestamp={entry.timestamp[0]}
                entry={entry.content}
                stressLevel={entry.stressLevel}
                remove={remove}
            />
        );
    });

    return (
        <div className="inline-block w-2/5">
            <form onSubmit={handleSubmit(onSubmit)} >
                <div>
                    <label htmlFor="entryInput">Input: </label>
                    <button
                        type="submit"
                        className="text-white bg-blue-400 p-2.5 mt-3 ml-4"
                    >
                        Add Entry
                    </button>
                </div>
                <textarea
                    name="entryInput"
                    ref={(e) => {
                        register(e, {
                            required: true,
                        });
                        inputRef.current = e;
                    }}
                    className="w-full resize-none px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-gray-200 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
                ></textarea>
                <div>
                <label htmlFor="stressLevelInput">
                        Rank how you feel:{" "}
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        name="stressLevelInput"
                        className="ml-3 resize-none px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-gray-200 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
                        ref={(e) => {
                            register(e, {
                                required: true,
                            });
                        }}
                    ></input>

                </div>
            </form>
            <div>{entriesItems}</div>
            <button type="button" className="text-white bg-blue-400 p-3 mt-3" onClick={onSave}>
                Save
            </button>
        </div>
    );
};

export default DataEntryForm;


