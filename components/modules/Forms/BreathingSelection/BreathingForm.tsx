import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import Button from "../../../elements/Buttons/Button";
import BreathingDurationRadioGroup from "./BreathingDurationRadioGroup";
import BreathingTypeRadioGroup from "./BreathingTypeRadioGroup";

interface P {
    setSelection: Dispatch<SetStateAction<object>>;
}

interface InputData {
    duration: number;
    type: string;
}

const BreathingForm: React.FC<P> = ({ setSelection }) => {
    const { handleSubmit, register, reset } = useForm<InputData>({
        defaultValues: {
            duration: 1,
            type: "Energy"
        }
    });

    const onSubmit = (data: InputData) => {
        setSelection(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-4 bg-white rounded-lg"
        >
            <div>
                <BreathingDurationRadioGroup register={register} />
                <BreathingTypeRadioGroup
                    register={register}
                    setSelection={setSelection}
                />
            </div>
            <Button text="Set Timer" textSize="sm" bgcolor="highlight-secondary" />
        </form>
    );
};

export default BreathingForm;
