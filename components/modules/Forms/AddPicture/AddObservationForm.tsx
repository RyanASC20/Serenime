import { useForm } from "react-hook-form";

import Button from "../../../elements/Buttons/Button";
import { usePictureRef } from "../../../../utils/firestoreHooks";
import { PictureInterface } from "../../../../Types/index";

interface AddObersvationFormProps {
    imgId: string;
    currentData: string[];
}

const AddObersvationForm: React.FC<AddObersvationFormProps> = ({ imgId, currentData }) => {
    const { handleSubmit, register, reset } = useForm();
    const pictureRef = usePictureRef(imgId);

    const onSubmit = (data) => {
        pictureRef.set({
            observations: [...currentData, data.newObservation]
        }, { merge: true});
        reset();
    }

    return (
        <form className="flex justify-between mt-4" onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                name="newObservation"
                placeholder="Enter an observation"
                autoComplete="off"
                className="w-5/6 p-2 shadow-sm rounded-xl outline-none border-b focus:border-highlight"
                ref={register({required: true})}
            ></input>
            <Button text="+ Add" />
        </form>
    );
}

export default AddObersvationForm;