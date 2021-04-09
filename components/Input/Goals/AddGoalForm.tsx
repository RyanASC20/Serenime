import React from 'react';
import { useForm } from 'react-hook-form';
import Zoom from 'react-reveal/Zoom';

import { useHabitCategoriesRef} from '../../../hooks/firestoreHooks';
import Button from '../../Buttons/Button';
import CancelButton from '../../Buttons/CancelButton';

interface Props {
    setCreationMode?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GoalInput {
    goalInput: string;
}

const AddGoalForm: React.FC<Props> = ({ setCreationMode }) => {
    const { handleSubmit, register, reset } = useForm<GoalInput>();
    const habitCategoriesRef = useHabitCategoriesRef();

    const onSubmit = async(data: GoalInput) => {
        reset();
        habitCategoriesRef.set({
            [ data.goalInput ]: data.goalInput
        }, { merge: true });
    }
    
    return (
        <Zoom duration={300}>
            <form onSubmit={handleSubmit(onSubmit)} className="my-4 p-3 rounded-xl bg-white">
                <input
                    name="goalInput"
                    className="mb-2 inline-block transition duration-200 p-1.5 resize-none w-full border-b border-gray-300 focus:outline-none focus:border-highlight"
                    ref={register({
                        required: true,
                    })}
                    autoComplete="off"
                    placeholder="Add new goal: "
                ></input>
                <div className="flex justify-around mb-3">
                    <Button text="Add" textSize="xs"></Button>
                    <CancelButton text="Cancel" textSize="xs" onClick={() => { setCreationMode(false) } } />
                </div>
            </form>
       </Zoom>
    );
}

export default AddGoalForm;