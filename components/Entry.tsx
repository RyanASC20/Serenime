import { useState } from 'react';
import DataEntryForm from './Input/DataEntryForm';
import { emoteElements, deleteIconElement, penIconElement } from "../public/static/icons";

interface P {
    description: string;
    idx: number;
    mood: number;
    handleRemove: (idx: number) => void;
    setCreationMode: (b: boolean) => void;
}

const Entry: React.FC<P> = ({ description, idx, mood, handleRemove }) => {
    const [ editMode, setEditMode ] = useState<boolean>(false);

    if (!editMode) {
        return (
            <div
                className="mb-6 p-3 flex justify-between shadow-double-md rounded-lg w-full"
                key={idx}
            >
                <div>
                    {emoteElements[mood]}
                    <p>{description}</p>
                </div>
                <div className="flex content-center text-gray-400">
                    <button
                        type="button"
                        className="transition duration-250 focus:outline-none hover:text-red-500"
                        onClick={() => {
                            handleRemove(idx);
                        }}
                    >
                        {deleteIconElement}
                    </button>
                    <button
                        type="button"
                        className="transition duration-250 focus:outline-none hover:text-green-500"
                        onClick={() => {
                            setEditMode(true);
                        }}
                    >
                        { penIconElement }
                    </button>
                </div>
            </div>
        );
    }
    return (
        <>
            <DataEntryForm setEditMode={ setEditMode } entryIndex={ idx }/>
        </>
    )
    
};

export default Entry;
