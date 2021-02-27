import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import BreathingDurationRadioGroup from './BreathingDurationRadioGroup';
import BreathingTypeRadioGroup from './BreathingTypeRadioGroup';

interface P {
    setDuration: Dispatch<SetStateAction<number>>;
}


interface InputData {
    duration: number;
    type: string;
}

const BreathingForm: React.FC<P> = ({ setDuration }) => {
    const { handleSubmit, register, reset } = useForm<InputData>();

    const onSubmit = (data: InputData) => {
        setDuration(data.duration);
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BreathingDurationRadioGroup register={register} />
            <BreathingTypeRadioGroup register={register} />
            <button>SUBMIT</button>
        </form>
    )
}

export default BreathingForm;