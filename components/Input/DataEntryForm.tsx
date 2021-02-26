import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/useUser";
import MoodRadioGroup from "./MoodRadioGroup";
import TimePeriodRadioGoup from './TimePeriodRadioGroup';

interface P {
    setCreationMode?: (b: boolean) => void;
    setEditMode?: (b: boolean) => void;
    entryIndex?: number;
}

interface inputData {
    description: string;
    mood: number;
    timePeriod: string;
}

const DataEntryForm: React.FC<P> = ({setCreationMode, setEditMode, entryIndex}) => {
    const { entriesRef, entryData } = useUser();
    const { register, handleSubmit, reset, errors } = useForm<inputData>();
    

    const handleCreateSubmit = (data: inputData) => {
        if (entryData) {
            entriesRef.set({
                descriptions: [ { "timePeriod": data.timePeriod, "description": data.description }, ...entryData.descriptions ],
                moods: [ { "timePeriod": data.timePeriod, "mood": data.mood }, ...entryData.moods ],
            });
        } 
        else {
            entriesRef.set({
                descriptions: [ { "timePeriod": data.timePeriod, "description": data.description } ],
                moods: [ { "timePeriod": data.timePeriod, "mood": data.mood } ],
            });
        }

        setCreationMode(false);
    }

    const handleEditSubmit = (data: inputData) => {
        entriesRef.set({
            descriptions: [ ...entryData.descriptions.slice(0, entryIndex), { "timePeriod": data.timePeriod, "description": data.description }, ...entryData.descriptions.slice(entryIndex + 1)],
            moods: [ ...entryData.moods.slice(0, entryIndex), { "timePeriod": data.timePeriod, "mood": data.mood }, ...entryData.moods.slice(entryIndex + 1)],
        });
        setEditMode(false);
    }

    const onSubmit = (data: inputData) => {
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
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-3 mt-4 shadow-double-sm rounded-lg w-full"
        >
            <h2>How are you?</h2>
            <MoodRadioGroup register={ register }/>
            <h2>What have you been up to?</h2>
            <textarea
                name="description"
                className="transition duration-200 pd-2 resize-none w-full bg-base border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                ref={register({
                    required: true,
                })}
            ></textarea>
            <h2>When?</h2>
            <TimePeriodRadioGoup register={ register } />
            <button
                type="submit"
                className="p-2 text-green-500 shadow-double-xs rounded-lg hover:shadow-inner"
            >
                Save
            </button>
           { <button
                type="button"
                className="p-2 ml-3 text-red-500 shadow-double-xs rounded-lg hover:shadow-inner"
                onClick={ handleCancel }
            >
                Cancel
            </button> }
        </form>
    );
};

export default DataEntryForm;
